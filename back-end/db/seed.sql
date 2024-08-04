\c songs_dev;

INSERT INTO 
 artist ( name, website, img_url, main_genre, is_favorite )
VALUES
 ('Empire of the Sun', 'https://empireofthesun.co/', 'https://www.billboard.com/wp-content/uploads/media/empire-of-the-sun-Jen-Campbell-2016-billboard-1548.jpg', 'Electropop', true),
 ('Chappell Roan', 'https://www.iamchappellroan.com/', 'https://viberatecdn.blob.core.windows.net/entity/artist/chappell-roan-9q0dS', 'Synth-pop', true),
 ('Sabrina Carpenter', 'https://www.sabrinacarpenter.com/','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkZ76tQOAWiYbr4cKw67fuXkqsToE6-4sETQ&s', 'Pop', false)

INSERT INTO
 songs ( artist_id, name, artist, album, time, img_url, vid_url, is_favorite )
VALUES
 (1, 'Cherry Blossom', 'Empire Of The Sun', 'Cheery Blossom', '3:28', 'https://www.billboard.com/wp-content/uploads/2024/07/Empire-Of-The-Sun-cr-Melanie-Swerdan-press-2024-billboard-158.jpg?w=942&h=623&crop=1', 'JwJU042KU0s', true),
 (2, 'My Kink Is Karma', 'Chappell Roan', 'The Rise and Fall of a Midwest Princess', '3:43', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F68122940ad2367abe956e216e133c528.1000x1000x1.png', 'ePsqyPMIg6I', true),
 (3, 'Expresso', 'Sabrina Carpenter', 'Expresso', '2:55', 'https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2F4f504516b80989779e11a8b3d780daeb.1000x1000x1.png', 'eVli-tstM5E', true),
 (4, 'Fame', 'David Bowie', 'Young Americans', '4:12', 'https://m.media-amazon.com/images/I/91UPTyOIz+L._SX522_.jpg', 'vebdvAx214E', true ),
 (5, 'Once in a Lifetime', 'Talking Heads', 'Remain in Light', '4:19', 'https://m.media-amazon.com/images/I/71DFmkGJviL._SY679_.jpg', '5IsSpAOD6K8', true ),
 (5, 'The Great Curve', 'Talking Heads', 'Sand in the Vaseline', '5:39', 'https://upload.wikimedia.org/wikipedia/en/7/72/Sitvd1.jpg', 'IUSoGl5pTKs', true ),
 (5, '(Nothing But) Flowers',  'Talking Heads', 'Remain in Light', '6:28', 'https://upload.wikimedia.org/wikipedia/en/6/63/Nothingbutflowers.jpg', '2twY8YQYDBE',  false ),
 (6, 'Books about UFOs', 'Hüsker Dü', 'New Day Rising', '2:49', 'https://e.snmc.io/i/600/w/7cfbdde377df11f5d8e032673b1769b3/1505483/husker-du-books-about-ufos-Cover-Art.jpg', 'Ln4GzSbgJIo', true ),
 (7, 'Mr. Startup', 'Wolf Parade', 'Thin Mind', '3:31', 'https://megamart.subpop.com/cdn/shop/products/wolfparade-thinmind-cover-3000_1296x.jpg?v=1581651380', 'fhmljQrINDc', true ),
 (8, 'We Got the World', 'Icona Pop', 'This is...', '3:17', 'https://upload.wikimedia.org/wikipedia/en/8/82/WeGottheWorld.png', 'vG649VIouI0', false );