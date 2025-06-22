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
