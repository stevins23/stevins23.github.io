document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.button-54').forEach(button => {
        button.addEventListener('click', () => cargarProductos(button.dataset.categoria));
    });

    document.getElementById('carrito-icono').addEventListener('click', toggleDetalleCarrito);
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

    const idiomaPreferido = localStorage.getItem('idiomaSeleccionado') || 'es';
    if (idiomaPreferido === 'en') { // Cambiar al inglés si es el idioma preferido
        cambiarIdioma();
    }

    document.getElementById('menu-toggle').addEventListener('click', function() {
        var categorias = document.getElementById('categorias');
        if (categorias.classList.contains('oculto')) {
            categorias.classList.remove('oculto');
        } else {
            categorias.classList.add('oculto');
        }

        const divProductos = document.getElementById('productos');
        divProductos.innerHTML = ''; // Limpiar productos anteriores
    });

    document.querySelector('#productos').addEventListener('click', function() {
        const detalle = document.getElementById('detalle-carrito');
        detalle.classList.remove('visible');
    });
    
});

const traducciones = {
    es: {
        menu: "MENÚ",
        ron: "RON",
        ginebras: "GINEBRAS",
        cocteles: "COCTELES",
        cocteles_sin_alcohol: "COCTELES SIN ALCOHOL",
        whisky: "WHISKY",
        licores: "LICORES",
        vodka: "VODKA",
        chupitos: "CHUPITOS",
        sidras: "SIDRAS",
        refrescos: "REFRESCOS",
        brandy: "BRANDY",
        cervezas: "CERVEZAS",
        vinos: "VINOS",
        shishas: "SHISHAS",
        total: "Total",
        vaciarCarrito: "Vaciar Carrito"
    },
    en: {
        menu: "MENU",
        ron: "RUM",
        ginebras: "GINS",
        cocteles: "COCKTAILS",
        cocteles_sin_alcohol: "NON-ALCOHOLIC COCKTAILS",
        whisky: "WHISKY",
        licores: "LIQUEURS",
        vodka: "VODKA",
        chupitos: "SHOTS",
        sidras: "CIDERS",
        refrescos: "SOFT DRINKS",
        brandy: "BRANDY",
        cervezas: "BEERS",
        vinos: "WINES",
        shishas: "SHISHAS",
        total: "Total",
        vaciarCarrito: "Empty Cart"
    }
};


let carrito = [];

function cargarProductos(categoria) {
    const productosEjemplo = {
        ron: [
            { id: 1, nombre_es: 'RON ALDEA 15 AÑOS GRAN R', nombre_en: 'ALDEA RUM 15 YEARS GRAND R', precio: 8.00 },
            { id: 2, nombre_es: 'HABANA 7', nombre_en: 'HAVANA 7', precio: 7.00 },
            { id: 3, nombre_es: 'BRUGAL EXTRAVIEJO', nombre_en: 'BRUGAL EXTRA AGED', precio: 7.00 },
            { id: 4, nombre_es: 'CASIQUÉ', nombre_en: 'CASIQUÉ', precio: 6.00 },
            { id: 5, nombre_es: 'HABANA 3', nombre_en: 'HAVANA 3', precio: 6.00 },
            { id: 6, nombre_es: 'HABANA 5', nombre_en: 'HAVANA 5', precio: 6.00 },
            { id: 7, nombre_es: 'AREUCA', nombre_en: 'AREUCA', precio: 6.00 },
            { id: 8, nombre_es: 'BRUGAL AÑEJO', nombre_en: 'BRUGAL AGED', precio: 6.00 },
            { id: 9, nombre_es: 'CASIQUÉ AÑEJO', nombre_en: 'CASIQUÉ AGED', precio: 7.00 },
            { id: 10, nombre_es: 'BARCELO', nombre_en: 'BARCELO', precio: 6.00 },
            { id: 11, nombre_es: 'CAPITÁN MORGAN', nombre_en: 'CAPTAIN MORGAN', precio: 7.00 },
            { id: 12, nombre_es: 'BACARDI', nombre_en: 'BACARDI', precio: 7.00 },
            { id: 13, nombre_es: 'MATUSALEN', nombre_en: 'MATUSALEM', precio: 7.00 },
            { id: 14, nombre_es: 'HABANA RITUAL', nombre_en: 'HAVANA RITUAL', precio: 8.00 },
            { id: 15, nombre_es: 'HABANA ESP', nombre_en: 'HAVANA ESP', precio: 8.00 },
            { id: 16, nombre_es: 'GUAJIRO', nombre_en: 'GUAJIRO', precio: 5.50 },
            { id: 17, nombre_es: 'RON MIEL', nombre_en: 'HONEY RUM', precio: 5.00 }
        ],
        ginebras: [
            { id: 18, nombre_es: 'BEFEATER', nombre_en: 'BEFEATER', precio: 6.00 },
            { id: 19, nombre_es: 'GORDON\'S', nombre_en: 'GORDON\'S', precio: 7.00 },
            { id: 20, nombre_es: 'LARIOS', nombre_en: 'LARIOS', precio: 7.00 },
            { id: 21, nombre_es: 'LARIOS 12', nombre_en: 'LARIOS 12', precio: 8.00 },
            { id: 22, nombre_es: 'PUERTO DE INDIAS', nombre_en: 'PUERTO DE INDIAS', precio: 8.00 },
            { id: 23, nombre_es: 'SEAGRAM', nombre_en: 'SEAGRAM', precio: 8.00 },
            { id: 24, nombre_es: 'BULLDOG', nombre_en: 'BULLDOG', precio: 8.00 },
            { id: 25, nombre_es: 'TANQUERAY SEVILLA', nombre_en: 'TANQUERAY SEVILLA', precio: 8.00 },
            { id: 26, nombre_es: 'TANQUERAY 0.0', nombre_en: 'TANQUERAY 0.0', precio: 7.00 },
            { id: 27, nombre_es: 'TANQUERAY DRY', nombre_en: 'TANQUERAY DRY', precio: 7.00 },
            { id: 28, nombre_es: 'MONKEY 47', nombre_en: 'MONKEY 47', precio: 10.00 },
            { id: 29, nombre_es: 'NORDES', nombre_en: 'NORDES', precio: 8.00 },
            { id: 30, nombre_es: 'BOMBAY SAPPHIRE', nombre_en: 'BOMBAY SAPPHIRE', precio: 7.00 },
            { id: 31, nombre_es: 'HENDRICK\'S', nombre_en: 'HENDRICK\'S', precio: 9.00 },
            { id: 32, nombre_es: 'GINEBRA', nombre_en: 'GINEBRA', precio: 10.00 },
            { id: 33, nombre_es: 'GIN MARE', nombre_en: 'GIN MARE', precio: 10.00 },
            { id: 34, nombre_es: 'GIN GOLO OSBORNE', nombre_en: 'GIN GOLO OSBORNE', precio: 10.00 },
            { id: 35, nombre_es: 'MINA', nombre_en: 'MINA', precio: 8.00 },
            { id: 36, nombre_es: 'ROKU', nombre_en: 'ROKU', precio: 9.00 }
        ],
        cocteles: [
            { id: 37, precio: 7.00, nombre_es: 'PIÑA COLADA', nombre_en: 'PIÑA COLADA', descripcion_es: 'Ron flor de caña, puré de coco y zumo de piña', descripcion_en: 'Flor de Caña rum, coconut purée, and pineapple juice' },
            { id: 38, precio: 7.00, nombre_es: 'DAIQUIRI', nombre_en: 'DAIQUIRI', descripcion_es: 'Fresa/Plátano/Fruta de la Pasión, Ron flor de caña, zumo de lima y azúcar', descripcion_en: 'Strawberry/Banana/Passion Fruit, Flor de Caña rum, lime juice, and sugar' },
            { id: 39, precio: 7.00, nombre_es: 'SEX ON THE BEACH', nombre_en: 'SEX ON THE BEACH', descripcion_es: 'Vodka, licor de melocotón, zumo de arándanos y zumo de naranja', descripcion_en: 'Vodka, peach liqueur, cranberry juice, and orange juice' },
            { id: 40, precio: 7.00, nombre_es: 'TEQUILA SUNRISE', nombre_en: 'TEQUILA SUNRISE', descripcion_es: 'Tequila, zumo de naranja y granadina', descripcion_en: 'Tequila, orange juice, and grenadine' },
            { id: 41, precio: 7.00, nombre_es: 'CAIPIRINHA', nombre_en: 'CAIPIRINHA', descripcion_es: 'Lima, azúcar y cachaça', descripcion_en: 'Lime, sugar, and cachaça' },
            { id: 42, precio: 7.00, nombre_es: 'VALHALLA CLUB', nombre_en: 'VALHALLA CLUB', descripcion_es: 'Malibu, licor de plátano, licor de melón, zumo de piña y zumo de limón', descripcion_en: 'Malibu, banana liqueur, melon liqueur, pineapple juice, and lemon juice' },
            { id: 43, precio: 7.00, nombre_es: 'APEROL SPRITZ', nombre_en: 'APEROL SPRITZ', descripcion_es: 'Aperol, Prosecco y soda', descripcion_en: 'Aperol, Prosecco, and soda water' },
            { id: 44, precio: 7.00, nombre_es: 'PORN STAR MARTINI', nombre_en: 'PORN STAR MARTINI', descripcion_es: 'Vodka, sirope de vainilla, licor de maracuyá, puré de fruta de la pasión, zumo de lima y chupito de champagne', descripcion_en: 'Vodka, vanilla syrup, passion fruit liqueur, passion fruit purée, lime juice, and a shot of champagne' },
            { id: 45, precio: 7.00, nombre_es: 'NEGRONI', nombre_en: 'NEGRONI', descripcion_es: 'Gin, Campari y Vermut dulce', descripcion_en: 'Gin, Campari, and sweet Vermouth' },
            { id: 46, precio: 7.00, nombre_es: 'BLACK DREAM', nombre_en: 'BLACK DREAM', descripcion_es: 'Vodka negro, zumo de piña, passoa, lima, puré de manzana', descripcion_en: 'Black vodka, pineapple juice, passoa, lime, apple purée' },
            { id: 47, precio: 7.00, nombre_es: 'Mojito Clásico', nombre_en: 'Classic Mojito', descripcion_es: 'Ron flor de caña, azúcar, lima, hierbabuena, soda', descripcion_en: 'Flor de Caña rum, sugar, lime, mint, soda water' },
            { id: 48, precio: 7.00, nombre_es: 'Mojito Sabores', nombre_en: 'Flavored Mojito', descripcion_es: 'Ron flor de caña, azúcar, lima, hierbabuena, soda sabores (Fresa, fruta de la pasión, coco, plátano)', descripcion_en: 'Flor de Caña rum, sugar, lime, mint, flavored soda (Strawberry, passion fruit, coconut, banana)' },
            { id: 49, precio: 7.00, nombre_es: 'Margarita', nombre_en: 'Margarita', descripcion_es: 'Tequila, Cointreau y zumo de lima', descripcion_en: 'Tequila, Cointreau, and lime juice' },
            { id: 50, precio: 9.00, nombre_es: 'Cóctel a elección', nombre_en: 'Bartender\'s Choice', descripcion_es: 'Nuestro bartender puede preparar cualquier cóctel internacional a su sugerencia', descripcion_en: 'Our bartender can prepare any international cocktail upon request' }
        ],
        cocteles_sin_alcohol: [
            { id: 51, precio: 5.00, nombre_es: 'SAN FRANCISCO', nombre_en: 'SAN FRANCISCO', descripcion_es: 'Zumo de naranja, zumo de piña y granadina', descripcion_en: 'Orange juice, pineapple juice, and grenadine' },
            { id: 52, precio: 5.00, nombre_es: 'MOJITO', nombre_en: 'MOJITO', descripcion_es: 'Fresa, maracuyá y lima', descripcion_en: 'Strawberry, passion fruit, and lime' },
            { id: 53, precio: 5.00, nombre_es: 'PIÑA COLADA', nombre_en: 'PIÑA COLADA', descripcion_es: 'Leche de coco, sirope de coco y zumo de piña', descripcion_en: 'Coconut milk, coconut syrup, and pineapple juice' },
            { id: 54, precio: 9.00, nombre_es: 'Cóctel a elección', nombre_en: 'Bartender\'s Choice', descripcion_es: 'Nuestro bartender puede preparar cualquier cóctel internacional a su sugerencia', descripcion_en: 'Our bartender can prepare any international cocktail at your suggestion' }
        ],
        whisky: [
            { id: 55, nombre_es: 'J.B', nombre_en: 'J.B', precio: 7.00 },
            { id: 56, nombre_es: 'OLD PARR 12', nombre_en: 'OLD PARR 12', precio: 10.00 },
            { id: 57, nombre_es: 'BUCHANAN\'S', nombre_en: 'BUCHANAN\'S', precio: 8.00 },
            { id: 58, nombre_es: 'CHIVAS 12', nombre_en: 'CHIVAS 12', precio: 8.00 },
            { id: 59, nombre_es: 'BALLANTINE\'S FINEST', nombre_en: 'BALLANTINE\'S FINEST', precio: 7.00 },
            { id: 60, nombre_es: 'BALLANTINE\'S LIGHT', nombre_en: 'BALLANTINE\'S LIGHT', precio: 7.00 },
            { id: 61, nombre_es: 'JACK DANIEL\'S', nombre_en: 'JACK DANIEL\'S', precio: 7.00 },
            { id: 62, nombre_es: 'JAMESON', nombre_en: 'JAMESON', precio: 7.00 },
            { id: 63, nombre_es: 'CHIVAS 18', nombre_en: 'CHIVAS 18', precio: 180.00 },
            { id: 64, nombre_es: 'GRANT\'S', nombre_en: 'GRANT\'S', precio: 6.00 },
            { id: 65, nombre_es: 'CHANCELER', nombre_en: 'CHANCELER', precio: 7.00 },
            { id: 66, nombre_es: 'CARDHU', nombre_en: 'CARDHU', precio: 8.00 },
            { id: 67, nombre_es: 'BUSKER', nombre_en: 'BUSKER', precio: 7.00 },
            { id: 68, nombre_es: 'JOHNNIE WALKER RED LABEL', nombre_en: 'JOHNNIE WALKER RED LABEL', precio: 7.00 },
            { id: 69, nombre_es: 'JOHNNIE WALKER BLACK LABEL', nombre_en: 'JOHNNIE WALKER BLACK LABEL', precio: 8.00 },
            { id: 70, nombre_es: 'JOHNNIE WALKER GOLD LABEL', nombre_en: 'JOHNNIE WALKER GOLD LABEL', precio: 10.00 },
            { id: 71, nombre_es: 'JOHNNIE WALKER BLUE LABEL', nombre_en: 'JOHNNIE WALKER BLUE LABEL', precio: 250.00 },
            { id: 72, nombre_es: 'JOHNNIE WALKER DOUBLE BLACK', nombre_en: 'JOHNNIE WALKER DOUBLE BLACK', precio: 120.00 },
            { id: 73, nombre_es: 'JOHNNIE WALKER PLATINUM LABEL', nombre_en: 'JOHNNIE WALKER PLATINUM LABEL', precio: 130.00 }
        ],
        licores: [
            { id: 74, nombre_es: 'TÍA MARÍA VAINILLA', nombre_en: 'TIA MARIA VANILLA', precio: 5.50 },
            { id: 75, nombre_es: 'LICOR DE PLÁTANO', nombre_en: 'BANANA LIQUEUR', precio: 6.00 },
            { id: 76, nombre_es: 'COINTREAU', nombre_en: 'COINTREAU', precio: 6.00 },
            { id: 77, nombre_es: 'AMARETTO', nombre_en: 'AMARETTO', precio: 6.00 },
            { id: 78, nombre_es: 'APEROL', nombre_en: 'APEROL', precio: 5.50 },
            { id: 79, nombre_es: 'LICOR DE MELÓN', nombre_en: 'MELON LIQUEUR', precio: 6.00 },
            { id: 80, nombre_es: 'MALIBÚ', nombre_en: 'MALIBU', precio: 6.00 },
            { id: 81, nombre_es: 'CAMPARI', nombre_en: 'CAMPARI', precio: 5.50 },
            { id: 82, nombre_es: 'DISARONNO', nombre_en: 'DISARONNO', precio: 7.00 },
            { id: 83, nombre_es: 'BAILEY\'S', nombre_en: 'BAILEY\'S', precio: 5.50 },
            { id: 84, nombre_es: 'MARTINI EXTRA DRY', nombre_en: 'MARTINI EXTRA DRY', precio: 6.00 },
            { id: 85, nombre_es: 'MARTINI ROSSO', nombre_en: 'MARTINI ROSSO', precio: 6.00 },
            { id: 86, nombre_es: 'MARTINI BLANCO', nombre_en: 'MARTINI BIANCO', precio: 6.00 },
            { id: 87, nombre_es: 'HIPOPÓTAMO', nombre_en: 'HIPPOPOTAMUS', precio: 5.00 },
            { id: 88, nombre_es: 'AGUARDIENTE TAPA AZUL', nombre_en: 'BLUE CAP SPIRIT', precio: 40.00 },
            { id: 89, nombre_es: 'JÄGERMEISTER', nombre_en: 'JÄGERMEISTER', precio: 5.00 },
            { id: 90, nombre_es: 'TEQUILA JOSÉ CUERVO', nombre_en: 'JOSE CUERVO TEQUILA', precio: 6.00 }
        ],
        vodka: [
            { id: 91, nombre_es: 'VODKA CARAMELO', nombre_en: 'CARAMEL VODKA', precio: 5.00 },
            { id: 92, nombre_es: 'MOSKOVSKAYA', nombre_en: 'MOSKOVSKAYA', precio: 6.00 },
            { id: 93, nombre_es: 'VODKA NEGRO', nombre_en: 'BLACK VODKA', precio: 7.00 },
            { id: 94, nombre_es: 'VODKA NUVO BOTELLA', nombre_en: 'NUVO VODKA BOTTLE', precio: 180.00 },
            { id: 95, nombre_es: 'SMIRNOFF', nombre_en: 'SMIRNOFF', precio: 7.00 },
            { id: 96, nombre_es: 'GREY GOOSE BOTELLA', nombre_en: 'GREY GOOSE BOTTLE', precio: 180.00 },
            { id: 97, nombre_es: 'ABSOLUT', nombre_en: 'ABSOLUT', precio: 7.00 },
            { id: 98, nombre_es: 'CITRON', nombre_en: 'CITRON', precio: 10.00 },
            { id: 99, nombre_es: 'BELVEDERE BOTELLA', nombre_en: 'BELVEDERE BOTTLE', precio: 150.00 },
            { id: 100, nombre_es: 'MOËT & CHANDON BOTELLA', nombre_en: 'MOËT & CHANDON BOTTLE', precio: 120.00 },
            { id: 101, nombre_es: 'MOËT ICE BOTELLA', nombre_en: 'MOËT ICE BOTTLE', precio: 150.00 },
            { id: 102, nombre_es: 'MOËT ROSÉ BOTELLA', nombre_en: 'MOËT ROSÉ BOTTLE', precio: 150.00 }
        ],
        chupitos: [
            { id: 103, nombre_es: 'TEQUILA FRESA', nombre_en: 'STRAWBERRY TEQUILA', precio: 3.00 },
            { id: 104, nombre_es: 'VODKA CARAMELO', nombre_en: 'CARAMEL VODKA', precio: 2.00 },
            { id: 105, nombre_es: 'HIPOPÓTAMO', nombre_en: 'HIPPOPOTAMUS', precio: 3.00 },
            { id: 106, nombre_es: 'SAMBUCA', nombre_en: 'SAMBUCA', precio: 3.00 },
            { id: 107, nombre_es: 'BAILEYS', nombre_en: 'BAILEYS', precio: 3.00 },
            { id: 108, nombre_es: 'RON MIEL', nombre_en: 'HONEY RUM', precio: 2.00 },
            { id: 109, nombre_es: 'TEQUILA MANGO', nombre_en: 'MANGO TEQUILA', precio: 3.00 },
            { id: 110, nombre_es: 'TEQUILA JOSE CUERVO', nombre_en: 'JOSE CUERVO TEQUILA', precio: 3.00 }
        ],

        sidras: [
            { id: 111, nombre_es: 'KOPPARBERG FRESA LIMA', nombre_en: 'KOPPARBERG STRAWBERRY LIME', precio: 5.00 },
            { id: 112, nombre_es: 'MAGNERS', nombre_en: 'MAGNERS', precio: 5.00 },
            { id: 113, nombre_es: 'STRONGBOW', nombre_en: 'STRONGBOW', precio: 5.00 },
            { id: 114, nombre_es: 'KOPPARBERG FRUTOS DEL BOSQUE', nombre_en: 'KOPPARBERG MIXED BERRIES', precio: 5.00 },
            { id: 115, nombre_es: 'LADRÓN DE MANZANAS', nombre_en: 'APPLE THIEF', precio: 4.00 }
        ],
        refrescos: [
            { id: 116, nombre_es: 'COCA COLA', nombre_en: 'COCA COLA', precio: 3.00 },
            { id: 117, nombre_es: 'AQUARIUS NARANJA', nombre_en: 'AQUARIUS ORANGE', precio: 3.50 },
            { id: 118, nombre_es: 'AQUARIUS LIMÓN', nombre_en: 'AQUARIUS LEMON', precio: 3.50 },
            { id: 119, nombre_es: 'RED BULL', nombre_en: 'RED BULL', precio: 4.00 },
            { id: 120, nombre_es: 'AGUA SIN GAS', nombre_en: 'STILL WATER', precio: 3.00 },
            { id: 121, nombre_es: 'APPLETISER', nombre_en: 'APPLETISER', precio: 4.00 },
            { id: 122, nombre_es: 'AGUA CON GAS', nombre_en: 'SPARKLING WATER', precio: 3.00 },
            { id: 123, nombre_es: 'TROPICAL LIMÓN', nombre_en: 'TROPICAL LEMON', precio: 3.00 },
            { id: 124, nombre_es: 'TROPICAL', nombre_en: 'TROPICAL', precio: 3.00 },
            { id: 125, nombre_es: 'FANTA NARANJA', nombre_en: 'FANTA ORANGE', precio: 3.00 },
            { id: 126, nombre_es: 'FANTA LIMÓN', nombre_en: 'FANTA LEMON', precio: 3.00 },
            { id: 127, nombre_es: 'COCA COLA ZERO', nombre_en: 'COCA COLA ZERO', precio: 3.00 },
            { id: 128, nombre_es: 'SPRITE', nombre_en: 'SPRITE', precio: 3.00 }
        ],
        brandy: [
            { id: 129, nombre_es: 'CARLOS I', nombre_en: 'CARLOS I', precio: 8.00 },
            { id: 130, nombre_es: 'VETERANO', nombre_en: 'VETERANO', precio: 5.00 },
            { id: 131, nombre_es: 'MAGNO', nombre_en: 'MAGNO', precio: 5.00 }
        ],
        cervezas: [
            { id: 132, nombre_es: 'DORADA', nombre_en: 'DORADA', precio: 3.00 },
            { id: 133, nombre_es: 'CORONA', nombre_en: 'CORONA', precio: 3.50 },
            { id: 134, nombre_es: '1906', nombre_en: '1906', precio: 3.50 },
            { id: 135, nombre_es: 'ESTRELLA GALICIA', nombre_en: 'ESTRELLA GALICIA', precio: 3.00 },
            { id: 136, nombre_es: 'DORADA ESPECIAL', nombre_en: 'DORADA ESPECIAL', precio: 3.50 },
            { id: 137, nombre_es: 'TROPICAL 0.0', nombre_en: 'TROPICAL 0.0', precio: 3.00 },
            { id: 138, nombre_es: 'DORADA SIN', nombre_en: 'DORADA SIN', precio: 3.00 },
            { id: 139, nombre_es: 'DORADA TOSTADA', nombre_en: 'DORADA TOSTADA', precio: 3.50 },
            { id: 140, nombre_es: 'BUDWEISER', nombre_en: 'BUDWEISER', precio: 3.00 },
            { id: 141, nombre_es: 'PALMA REAL', nombre_en: 'PALMA REAL', precio: 3.00 },
            { id: 142, nombre_es: 'CUBANERO', nombre_en: 'CUBANERO', precio: 3.00 },
            { id: 143, nombre_es: 'GUINNESS', nombre_en: 'GUINNESS', precio: 3.50 },
            { id: 144, nombre_es: 'AMSTEL (CAÑA)', nombre_en: 'AMSTEL (DRAUGHT)', precio: 2.50 },
            { id: 145, nombre_es: 'AMSTEL (JARRA)', nombre_en: 'AMSTEL (PINT)', precio: 4.00 },
            { id: 146, nombre_es: 'HEINEKEN (CAÑA)', nombre_en: 'HEINEKEN (DRAUGHT)', precio: 2.50 },
            { id: 147, nombre_es: 'HEINEKEN (JARRA)', nombre_en: 'HEINEKEN (PINT)', precio: 4.00 }
        ],
        vinos: [
            { id: 148, nombre_es: 'TINTO (COPA)', nombre_en: 'RED WINE (GLASS)', precio: 4.00 },
            { id: 149, nombre_es: 'TINTO (BOTELLA)', nombre_en: 'RED WINE (BOTTLE)', precio: 12.00 },
            { id: 150, nombre_es: 'BLANCO (COPA)', nombre_en: 'WHITE WINE (GLASS)', precio: 4.00 },
            { id: 151, nombre_es: 'BLANCO (BOTELLA)', nombre_en: 'WHITE WINE (BOTTLE)', precio: 12.00 },
            { id: 152, nombre_es: 'ROSADO (COPA)', nombre_en: 'ROSÉ (GLASS)', precio: 4.00 },
            { id: 153, nombre_es: 'ROSADO (BOTELLA)', nombre_en: 'ROSÉ (BOTTLE)', precio: 12.00 }
        ],
        shishas: [
            { id: 154, precio: 18.00, nombre_es: 'Love 66 de Adalya', nombre_en: 'Love 66 by Adalya', descripcion_es: 'Tabaco de alta calidad con sabor a Fruta de la Pasión, Melón, Menta y Sandía', descripcion_en: 'High-quality tobacco flavored with Passion Fruit, Melon, Mint, and Watermelon' },
            { id: 155, precio: 18.00, nombre_es: 'Punk Man de Adalya', nombre_en: 'Punk Man by Adalya', descripcion_es: 'Bayas, Arándano, Fresa, Frambuesa', descripcion_en: 'Berries, Blueberry, Strawberry, Raspberry' },
            { id: 156, precio: 18.00, nombre_es: 'I’ss Lie on the Rock de Adalya', nombre_en: 'I’ss Lie on the Rock by Adalya', descripcion_es: 'Arándanos, Goma de mascar, Lima y Hielo', descripcion_en: 'Blueberries, Bubblegum, Lime, and Ice' },
            { id: 157, precio: 18.00, nombre_es: 'Mi Amor de Blue Horse', nombre_en: 'Mi Amor by Blue Horse', descripcion_es: 'Bayas, Plátano, Piña y Hielo', descripcion_en: 'Berries, Banana, Pineapple, and Ice' },
            { id: 158, precio: 18.00, nombre_es: 'Red Blast de Taboo', nombre_en: 'Red Blast by Taboo', descripcion_es: 'Menta y Frambuesa', descripcion_en: 'Mint and Raspberry' },
            { id: 159, precio: 18.00, nombre_es: 'Blue Yellow de Adalya', nombre_en: 'Blue Yellow by Adalya', descripcion_es: 'Arándano y Melón', descripcion_en: 'Blueberry and Melon' },
            { id: 160, precio: 18.00, nombre_es: 'Dancing Queen de Taboo', nombre_en: 'Dancing Queen by Taboo', descripcion_es: 'Menta y Vainilla', descripcion_en: 'Mint and Vanilla' },
            { id: 161, precio: 18.00, nombre_es: 'Gipsy King de Adalya', nombre_en: 'Gipsy King by Adalya', descripcion_es: 'Lima, Durazno, Melón y Sandía', descripcion_en: 'Lime, Peach, Melon, and Watermelon' },
            { id: 162, precio: 18.00, nombre_es: 'Cotton Candy de Hookain', nombre_en: 'Cotton Candy by Hookain', descripcion_es: 'Algodón de Azúcar', descripcion_en: 'Cotton Candy' },
            { id: 163, precio: 18.00, nombre_es: 'Three Angels de Adalya', nombre_en: 'Three Angels by Adalya', descripcion_es: 'Hielo, Lima, Fruta de la Pasión y Toronja', descripcion_en: 'Ice, Lime, Passion Fruit, and Grapefruit' },
            { id: 164, precio: 18.00, nombre_es: 'Feel de Privilege Smoke', nombre_en: 'Feel by Privilege Smoke', descripcion_es: 'Pera', descripcion_en: 'Pear' },
            { id: 165, precio: 18.00, nombre_es: 'Dive de Privilege Smoke', nombre_en: 'Dive by Privilege Smoke', descripcion_es: 'Menta y Melón', descripcion_en: 'Mint and Melon' },
            { id: 166, precio: 18.00, nombre_es: 'White Cake', nombre_en: 'White Cake', descripcion_es: 'Tarta de Queso, Vainilla, Caramelo y Palomitas', descripcion_en: 'Cheesecake, Vanilla, Caramel, and Popcorn' },
            { id: 167, precio: 18.00, nombre_es: 'Uva de Al Fakher', nombre_en: 'Grape by Al Fakher', descripcion_es: 'Uva', descripcion_en: 'Grape' },
            { id: 168, precio: 18.00, nombre_es: 'Menta de Al Fakher', nombre_en: 'Mint by Al Fakher', descripcion_es: 'Menta', descripcion_en: 'Mint' },
            { id: 169, precio: 12.00, nombre_es: 'RECAMBIO', nombre_en: 'REFILL', descripcion_es: '', descripcion_en: '' },
            { id: 170, precio: 1.00, nombre_es: 'CARBONES', nombre_en: 'CHARCOALS', descripcion_es: '', descripcion_en: '' },
            { id: 171, precio: 10.00, nombre_es: 'VAPER’S', nombre_en: 'VAPERS', descripcion_es: '', descripcion_en: '' },
        ],
    };

    const divProductos = document.getElementById('productos');
    divProductos.innerHTML = ''; // Limpiar productos anteriores

    productosEjemplo[categoria].forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');

        const nombreProducto = document.createElement('div');
        nombreProducto.classList.add('nombre-producto');
        // Decidir el nombre del producto según el idioma actual
        nombreProducto.textContent = idiomaActual === 'es' ? producto.nombre_es : producto.nombre_en;

        const precioProducto = document.createElement('div');
        precioProducto.classList.add('precio-producto');
        precioProducto.textContent = `$${producto.precio}`;

        divProducto.appendChild(nombreProducto);
        divProducto.appendChild(precioProducto);

        // Verificar si el producto tiene una descripción y crear el elemento HTML si es necesario
        if (producto.descripcion_es || producto.descripcion_en) {
            const descripcionProducto = document.createElement('div');
            descripcionProducto.classList.add('descripcion-producto');
            // Usar la descripción según el idioma actual
            descripcionProducto.textContent = idiomaActual === 'es' ? producto.descripcion_es : producto.descripcion_en;
            divProducto.appendChild(descripcionProducto);
        }

        divProducto.onclick = () => agregarAlCarrito(producto);

        divProductos.appendChild(divProducto);
    });


    var categorias = document.getElementById('categorias');

    categorias.classList.add('oculto');
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarDetalleCarrito();
}

function actualizarDetalleCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = ''; // Limpiar detalle carrito

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.classList.add('item-carrito');

        // Decidir el nombre del producto según el idioma actual
        const nombreProducto = document.createElement('span');
        nombreProducto.classList.add('nombre-producto');
        nombreProducto.textContent = idiomaActual === 'es' ? producto.nombre_es : producto.nombre_en;

        // Crear un elemento para el precio del producto
        const precioProducto = document.createElement('span');
        precioProducto.classList.add('precio-producto');
        precioProducto.textContent = ` - $${producto.precio}`;

        // Agregar el nombre y precio al elemento de la lista
        li.appendChild(nombreProducto);
        li.appendChild(precioProducto);

        listaCarrito.appendChild(li);
    });

    actualizarTotal();
}


function actualizarTotal() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    document.getElementById('total-carrito').textContent = total;
    document.getElementById('contador-carrito').textContent = '$' + total;
}

function vaciarCarrito() {
    carrito = [];
    actualizarDetalleCarrito();
}

function toggleDetalleCarrito() {
    const detalle = document.getElementById('detalle-carrito');
    detalle.classList.toggle('visible');
}

let idiomaActual = 'es'; // Español por defecto

function cambiarIdioma() {
    const divProductos = document.getElementById('productos');
    divProductos.innerHTML = ''; // Limpiar productos anteriores

    idiomaActual = idiomaActual === 'es' ? 'en' : 'es'; // Cambiar el idioma

    // Actualizar la imagen de la bandera en el botón
    const imagenBandera = document.getElementById('imagen-bandera');
    imagenBandera.src = idiomaActual === 'es' ? 'es.png' : 'en.png';
    imagenBandera.alt = idiomaActual === 'es' ? 'Español' : 'English';

    // Actualizar las traducciones en la página
    document.querySelector('.twelve h1').textContent = traducciones[idiomaActual].menu;
    document.querySelectorAll('.button-54').forEach((button) => {
        button.textContent = traducciones[idiomaActual][button.dataset.categoria];
    });
    document.querySelector('#vaciar-carrito').textContent = traducciones[idiomaActual].vaciarCarrito;
    // Asegúrate de actualizar otros elementos que necesiten traducción

    localStorage.setItem('idiomaSeleccionado', idiomaActual);
}

