document.addEventListener('DOMContentLoaded', function() {
    // Функционал вкладок
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок и содержимого
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс к нажатой кнопке
            button.classList.add('active');
            
            // Показываем соответствующее содержимое
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

        // Элементы поиска
    const searchInput = document.getElementById('nameSearch');
    const table = document.querySelector('.sw-table');
    const tbody = table.querySelector('tbody');
    const originalRows = Array.from(tbody.querySelectorAll('tr'));
    
    // Обработчик поиска
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        originalRows.forEach(row => {
            const nameCell = row.children[1]; // Второй столбец (название)
            const nameText = nameCell.textContent.toLowerCase();
            
            if (searchTerm === '' || nameText.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        // Показываем сообщение, если ничего не найдено
        showNoResultsMessage();
    });
    
    function showNoResultsMessage() {
        const visibleRows = Array.from(tbody.querySelectorAll('tr')).filter(
            row => row.style.display !== 'none'
        );
        
        const noResultsRow = tbody.querySelector('tr.no-results');
        
        if (visibleRows.length === 0) {
            if (!noResultsRow) {
                const row = document.createElement('tr');
                row.className = 'no-results';
                row.innerHTML = `
                    <td colspan="${table.querySelectorAll('th').length}">
                        <i class="fas fa-search"></i>
                        <p>Ничего не найдено</p>
                    </td>
                `;
                tbody.appendChild(row);
            }
        } else if (noResultsRow) {
            noResultsRow.remove();
        }
    }

   const sortableHeaders = document.querySelectorAll('.sw-table th:not(.fixed-column) i.fa-sort');
    
    sortableHeaders.forEach(icon => {
        icon.addEventListener('click', function() {
            const th = this.parentElement;
            const table = th.closest('table');
            const columnIndex = Array.from(th.parentElement.children).indexOf(th);
            const isAscending = !th.classList.contains('asc');
            
            // Сбрасываем сортировку для всех колонок (кроме фиксированной)
            table.querySelectorAll('th:not(.fixed-column)').forEach(header => {
                header.classList.remove('asc', 'desc');
                const icon = header.querySelector('i');
                if (icon) icon.className = 'fas fa-sort';
            });
            
            // Устанавливаем направление сортировки
            th.classList.add(isAscending ? 'asc' : 'desc');
            this.className = isAscending ? 'fas fa-sort-up' : 'fas fa-sort-down';
            
            // Сортируем таблицу (начиная со второго столбца)
            sortTable(table, columnIndex, isAscending);
        });
    });
    
    function sortTable(table, columnIndex, ascending) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // Сохраняем оригинальный порядок ID
        const originalOrder = rows.map(row => row.children[0].textContent.trim());
        
        // Сортируем строки (исключая первый столбец из сравнения)
        rows.sort((a, b) => {
            const aText = a.children[columnIndex].textContent.trim();
            const bText = b.children[columnIndex].textContent.trim();
            return compareValues(aText, bText, ascending);
        });
        
        // Восстанавливаем оригинальный порядок ID
        rows.forEach((row, index) => {
            row.children[0].textContent = originalOrder[index];
        });
        
        // Обновляем таблицу
        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));
    }
    
    // Функция сравнения значений с учетом чисел, русских и английских букв
    function compareValues(a, b, ascending = true) {
        // Проверяем, являются ли значения числами
        const aNum = parseFloat(a.replace(/\s+/g, '').replace(',', '.'));
        const bNum = parseFloat(b.replace(/\s+/g, '').replace(',', '.'));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return ascending ? aNum - bNum : bNum - aNum;
        }
        
        // Если одно значение число, а другое нет - числа идут первыми
        if (!isNaN(aNum) && isNaN(bNum)) return ascending ? -1 : 1;
        if (isNaN(aNum) && !isNaN(bNum)) return ascending ? 1 : -1;
        
        // Сравниваем строки с учетом языка
        const aIsRussian = isRussian(a);
        const bIsRussian = isRussian(b);
        
        // Если одна строка русская, а другая английская
        if (aIsRussian && !bIsRussian) return ascending ? -1 : 1;
        if (!aIsRussian && bIsRussian) return ascending ? 1 : -1;
        
        // Сравниваем строки на одном языке
        return ascending 
            ? a.localeCompare(b, aIsRussian ? 'ru' : 'en') 
            : b.localeCompare(a, bIsRussian ? 'ru' : 'en');
    }
    
    // Функция проверки, содержит ли строка русские буквы
    function isRussian(str) {
        return /[а-яА-ЯЁё]/.test(str);
    }

    document.querySelectorAll('.toggle-upgrades-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const table = this.nextElementSibling;
        const icon = this.querySelector('i');
        const showText = this.querySelector('.show-text');
        const hideText = this.querySelector('.hide-text');
      
        if (table.style.display === 'none') {
            table.style.display = 'table';
            showText.style.display = 'none';
            hideText.style.display = 'inline';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            table.style.display = 'none';
            showText.style.display = 'inline';
            hideText.style.display = 'none';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } 
        });
    });
    
    // Функционал выбора уровня реликвии
    const relicButtons = document.querySelectorAll('.relic-level');
    const statValues = {
        health: ['25,000', '26,500', '28,200', '30,100', '32,200', '34,500', '35,280'],
        protection: ['20,000', '21,200', '22,600', '24,100', '25,800', '27,600', '28,224'],
        speed: ['138', '140', '142', '144', '146', '147', '148'],
        'phys-dmg': ['3,800', '4,000', '4,150', '4,300', '4,450', '4,500', '4,512'],
        'phys-crit': ['40%', '40.5%', '41%', '41.5%', '42%', '42.3%', '42.5%']
    };
    
    relicButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            relicButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс к нажатой кнопке
            button.classList.add('active');
            
            // Обновляем статистику в зависимости от уровня реликвии
            const level = parseInt(button.getAttribute('data-level'));
            if (level >= 0 && level <= 7) {
                // Для демонстрации показываем максимальную статистику для любого уровня реликвии
                const displayLevel = Math.min(level, 6); // Наш массив содержит 7 элементов (0-6)
                
                document.getElementById('health').textContent = statValues.health[displayLevel];
                document.getElementById('protection').textContent = statValues.protection[displayLevel];
                document.getElementById('speed').textContent = statValues.speed[displayLevel];
                document.getElementById('phys-dmg').textContent = statValues['phys-dmg'][displayLevel];
                document.getElementById('phys-crit').textContent = statValues['phys-crit'][displayLevel];
            }
        });
    });
    
    // Инициализация с статистикой для реликвии 7 (индекс 6 в нашем массиве)
    document.getElementById('health').textContent = statValues.health[6];
    document.getElementById('protection').textContent = statValues.protection[6];
    document.getElementById('speed').textContent = statValues.speed[6];
    document.getElementById('phys-dmg').textContent = statValues['phys-dmg'][6];
    document.getElementById('phys-crit').textContent = statValues['phys-crit'][6];
});
