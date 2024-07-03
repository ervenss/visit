/*
скролл на jquery

возвращаем список элементов, функция передается как аргумент в другую функцию, в момент передечи она не
 выполняется, она будет вызвана только после клика
$ - название функции, такое сокращение
$(".menu-element__link").click(function() {
    const thisElement = $(this);
    if (thisElement.hasClass('active')) {
        return;
    }
    const linkHref = thisElement.attr("href");
    const hrefElement = $(linkHref);
    const paddingTop = parseInt(hrefElement.css("padding-top"));
    const menuHeight = $(".header-top").height();
    $([document.documentElement, document.body]).animate({
        scrollTop: hrefElement.offset().top - paddingTop - menuHeight
    }, 1500);
    $(".menu-element__link.active").removeClass('active');
    thisElement.addClass('active');
});*/




// плавный скролл

// Находим элемент с классом "header-top" и сохраняем его высоту в переменную menuHeight
const menuHeight = document.querySelector(".header-top").clientHeight;

// Находим все элементы с классом "menu-element__link" и сохраняем их в коллекцию menuElementLinks
const menuElementLinks = document.querySelectorAll(".menu-element__link");

// Для каждого элемента из коллекции menuElementLinks выполняем функцию
menuElementLinks.forEach(element => {    //forEach пройдется по каждому элементту и передаст его в функцию
    // Добавляем событие "click" на каждый элемент
    element.addEventListener("click", function (e) {
        // Предотвращаем стандартное поведение ссылки (перезагрузку страницы)
        e.preventDefault();

        // Если у элемента уже есть класс 'active', прекращаем выполнение функции
        if (this.classList.contains('active')) {
            return;
        }

        // Получаем значение атрибута "href" элемента (ссылка на якорь)
        const linkHref = this.getAttribute("href");
        // Находим элемент на странице с ID, который соответствует значению ссылки (удаляем символ "#")
        const hrefElement = document.getElementById(linkHref.replace("#", ""));

        // Получаем значение padding-top элемента с ID 'work' и преобразуем его в число
        const paddingTop = parseInt(getComputedStyle(document.querySelector('#work')).paddingTop);

        // Плавно прокручиваем страницу к найденному элементу, учитывая padding-top и высоту меню
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: hrefElement.offsetTop - paddingTop - menuHeight
        });

        // Удаляем класс 'active' у текущего активного элемента меню
        document.querySelector(".menu-element__link.active").classList.remove('active');
        // Добавляем класс 'active' к текущему элементу, по которому был клик
        this.classList.add('active');
    });
});



/* Active link on scroll to section */
const options = {
    threshold: 0.3
}
const callback = function(entries) {
    entries.forEach(entry => {
        const sectionMenuLink = document.querySelector(`.menu-element__link[href='#${entry.target.id}']`);
        if (entry.isIntersecting && !hasClass(sectionMenuLink, 'active')) {
            changeActiveMenuElement(sectionMenuLink);
        }
    });
};
const observer = new IntersectionObserver(callback, options);
document.querySelectorAll(".observer-section").forEach(element => {
    observer.observe(element);
});

// Общие функции
/**
 * Меняет активный элемент в пунктах меню
 * @param element Ссылка в меню
 */
function changeActiveMenuElement(element) {
    document.querySelector(".menu-element__link.active").classList.remove('active');
    element.classList.add('active');
}

/**
 * Проверяет наличие класса у элемента
 * @param element
 * @param className
 */
function hasClass(element, className) {
    return element.classList.contains(className);
}
document.addEventListener('DOMContentLoaded', function() {
    const skillFilters = document.querySelectorAll('.skills-filter');
    const skillRows = document.querySelectorAll('.skills-list__row');
    const skillElements = document.querySelectorAll('.skills-list__element');
    const skillCards = document.querySelectorAll('.skill-card');

    // Display the first skill card by default (only on larger screens)
    if (window.innerWidth > 768) {
        const defaultCard = document.getElementById('html-card');
        if (defaultCard) {
            defaultCard.classList.add('active');
            highlightFirstSkillCard();
        }
    }

    function showFirstVisibleSkillCard() {
        const visibleSkills = Array.from(skillElements).filter(skill => skill.offsetParent !== null);
        if (visibleSkills.length > 0) {
            const firstVisibleSkillName = visibleSkills[0].getAttribute('data-skill') + '-card';
            skillCards.forEach(card => {
                if (card.id === firstVisibleSkillName) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }
    }

    function highlightFirstSkillCard() {
        const firstSkillElement = document.querySelector('.skills-list__element.active');
        if (firstSkillElement) {
            firstSkillElement.classList.add('active-outline');
        }
    }

    skillFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            skillFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const filterValue = filter.getAttribute('data-filter');
            skillRows.forEach(row => {
                if (filterValue === 'all' || row.getAttribute('data-category') === filterValue) {
                    row.style.display = 'flex';
                } else {
                    row.style.display = 'none';
                }
            });

            // Hide all skill cards when filter is changed and show the first visible skill card
            skillCards.forEach(card => card.classList.remove('active'));
            showFirstVisibleSkillCard();
            highlightFirstSkillCard();
        });
    });

    skillElements.forEach(skill => {
        skill.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Only for mobile view
                const skillName = skill.getAttribute('data-skill') + '-card';
                const skillCard = document.getElementById(skillName);

                if (skillCard) {
                    const isActive = skillCard.classList.contains('active');
                    skillCards.forEach(card => card.classList.remove('active'));
                    if (!isActive) {
                        skillCard.classList.add('active');
                        skill.parentNode.insertBefore(skillCard, skill.nextSibling);
                    } else {
                        skillCard.classList.remove('active');
                    }
                }
            } else {
                skillElements.forEach(el => el.classList.remove('active-outline'));
                skill.classList.add('active-outline');

                const skillName = skill.getAttribute('data-skill') + '-card';
                skillCards.forEach(card => {
                    if (card.id === skillName) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                });
            }
        });
    });
});


function toggleLanguage() {
    // Находим все элементы, которые нужно перевести
    const elements = document.querySelectorAll('.translate');
    
    // Переключаем язык у всех найденных элементов
    elements.forEach(element => {
        // Получаем текущий текст и текущий язык
        const currentText = element.textContent.trim();
        const currentLang = element.getAttribute('data-lang') || 'ru'; // По умолчанию русский язык
        
        // Определяем новый язык и устанавливаем текст в соответствии с ним
        const newLang = currentLang === 'ru' ? 'en' : 'ru'; // Переключаем язык
        element.textContent = element.getAttribute('data-' + newLang);
        element.setAttribute('data-lang', newLang); // Сохраняем текущий язык в атрибуте
    });
}