import React from 'react';

const ShareModal = ({
    isOpen,
    onClose,
    fullTitle,
    fullDescription
}: any) => {
    const handleCopy = () => {
        const textToCopy = `Задача: ${fullTitle}\nОписание задачи: ${fullDescription}\nЗадача была создана в самом лучшем To Do приложении разработчиком BREADushek <3`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Текст скопирован в буфер обмена!');
                onClose();
            })
            .catch(err => console.error('Ошибка копирования: ', err));
    };

    const icons = [
        { src: "../src/assets/icons/vk-modal-share.svg", alt: "VK" },
        { src: "../src/assets/icons/telegram-modal-share.svg", alt: "Telegram" },
        { src: "../src/assets/icons/whatsapp-modal-share.svg", alt: "WhatsApp" },
        { src: "../src/assets/icons/facebook-modal-share.svg", alt: "Facebook" },
    ];

    return (
        <div className={`share-modal ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleCopy}>
                    <img src="../src/assets/icons/copy-modal-share.svg" alt="Копировать" />
                </button>
                {icons.map((icon, index) => (
                    <button key={index} className="icon-button">
                        <img src={icon.src} alt={icon.alt} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShareModal;
