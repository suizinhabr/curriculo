// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Ativar link de navegação ativo ao rolar
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animação ao rolar - Fade In
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar observador apenas aos cards de projeto
document.querySelectorAll('.project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Validação e envio do formulário
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(contactForm);
        const data = {
            nome: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            mensagem: contactForm.querySelector('textarea').value
        };

        // Validação básica
        if (data.nome.trim() === '' || data.email.trim() === '' || data.mensagem.trim() === '') {
            showMessage('Por favor, preencha todos os campos!', 'error');
            return;
        }

        // Validar email
        if (!isValidEmail(data.email)) {
            showMessage('Por favor, insira um email válido!', 'error');
            return;
        }

        // Simular envio (em produção, seria um POST para um servidor)
        console.log('Formulário enviado:', data);
        showMessage('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
        contactForm.reset();
    });
}

// Validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar mensagem
function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageElement.remove(), 300);
    }, 3000);
}

// Animações CSS para mensagens
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .nav-link.active {
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Efeito parallax ao rolar (opcional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0px ${scrolled * 0.5}px`;
    }
});

// Modo escuro/claro (opcional - descomente para usar)
/*
function toggleTheme() {
    document.documentElement.style.colorScheme = 
        document.documentElement.style.colorScheme === 'dark' ? 'light' : 'dark';
}

// Adicionar botão de tema (se desejar)
*/

// Console welcome message
console.log('%c🎨 Bem-vindo ao meu portfólio criativo!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cCriado com HTML, CSS e JavaScript', 'color: #ec4899; font-size: 14px;');
