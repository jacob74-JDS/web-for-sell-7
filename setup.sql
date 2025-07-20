│   │   ├── brand-logos.png
│   │   ├── coinbase.svg
│   │   ├── eth-coin.png
│   │   ├── hero-icon-1.png
│   │   ├── hero-icon-2.png
│   │   ├── hero-icon-3.png
│   │   ├── logo.svg
│   │   ├── nft-1.jpg
│   │   ├── nft-2.jpg
│   │   ├── nft-3.jpg
│   │   ├── nft-4.jpg
│   │   ├── nft-5.jpg
│   │   ├── nft-6.jpg
│   │   ├── patterns.png
│   │   └── user-avatars.png


CREATE DATABASE IF NOT EXISTS nft_db;

USE nft_db;

CREATE TABLE nfts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    creator VARCHAR(255) NOT NULL,
    price DECIMAL(10, 4) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    category ENUM('Art', 'Games', 'Sports', 'Memes', 'Photography') NOT NULL
);

INSERT INTO nfts (title, creator, price, image_url, category) VALUES
('Quantum Vision', 'CyberPunk', 0.005, 'assets/nft-1.jpg', 'Art'),
('Veiled Oracle', 'Gummy', 0.005, 'assets/nft-2.jpg', 'Art'),
('Neon Caesar', 'StatueX', 0.005, 'assets/nft-3.jpg', 'Art'),
('Chrono-Void', 'Gummy', 0.005, 'assets/nft-4.jpg', 'Art'),
('Panda Protocol', 'Disrupt', 0.005, 'assets/nft-5.jpg', 'Games'),
('Cosmic Traveler', 'Gummy', 0.005, 'assets/nft-6.jpg', 'Photography'),
('Pixel Knight', 'Retro', 0.012, 'assets/placeholder-game.jpg', 'Games'),
('Meme Lord', 'DankArt', 0.002, 'assets/placeholder-meme.jpg', 'Memes'),
('Soccer Star #7', 'SportsNFT', 0.080, 'assets/placeholder-sport.jpg', 'Sports');