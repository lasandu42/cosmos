package com.cosmos.service;

import com.cosmos.model.Planet;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlanetService {

    private final List<Planet> planets;

    public PlanetService(){
        planets =new ArrayList<>();

        Planet mercury =new Planet(
                "Mercury","The Swift Planet",
                "The smallest and fastest planet, closest to the Sun and completes its orbit in just 88 Earth days.",
                38.0, 0, "☿", "#C9A876","#8B7355"
        );
        mercury.addDetailSection("Atmosphere","Mercury possesses a thin exosphere made up of atoms blasted off the surface by the solar wind and striking meteoroids. Mercury's exosphere is composed mostly of oxygen, sodium, hydrogen, helium, and potassium." +
                "\nSource: NASA Science");
        mercury.addDetailSection("Size and Distance","With a radius of 1,516 miles (2,440 kilometers), Mercury is a little more than 1/3 the width of Earth. If Earth were the size of a nickel, Mercury would be about as big as a blueberry.\n" +
                "\n" +
                "From an average distance of 36 million miles (58 million kilometers), Mercury is 0.4 astronomical units away from the Sun.");
        mercury.addDetailSection("Structure & Surface","Mercury is the second densest planet, after Earth. It has a large metallic core with a radius of about 1,289 miles (2,074 kilometers), about 85% of the planet's radius. There is evidence that it is partly molten or liquid" +
                "\nMercury's surface resembles that of Earth's Moon, scarred by many impact craters resulting from collisions with meteoroids and comets. Craters and features on Mercury are named after famous deceased artists, musicians, or authors, including children's author Dr. Seuss and dance pioneer Alvin Ailey.\n" +
                "\n" +
                "Very large impact basins, including Caloris (960 miles or 1,550 kilometers in diameter) and Rachmaninoff (190 miles, or 306 kilometers in diameter), were created by asteroid impacts on the planet's surface early in the solar system's history. " +
                "\nSource: NASA Science");
        planets.add(mercury);

        Planet venus=new Planet(
                "Venus", "Earth's Twin",
                "Similar in size to Earth, but with a toxic, crushing atmosphere.",
                91.0, 0, "♀", "#E8C15A","#C77B3D"
        );
        venus.addDetailSection("Atmosphere","Venus’ atmosphere is one of extremes. With the hottest surface in the solar system, apart from the Sun itself, Venus is hotter even than the innermost planet, charbroiled Mercury. The atmosphere is mostly carbon dioxide — the same gas drives the greenhouse effect on both Venus and Earth — with dense clouds composed of sulfuric acid. The atmospheric pressure at the surface measures a crushing 93 times what it is at sea level on Earth" +
                "\nSource: NASA Science");
        venus.addDetailSection("Size and Distance","Venus orbits the Sun from an average distance of 67 million miles (108 million kilometers), or 0.72 astronomical units (1 astronomical unit, abbreviated AU, is the distance from the Sun to Earth). Sunlight takes about six minutes to travel from the Sun to Venus, compared to about eight minutes for the Sun and Earth." +
                "\n" +
                "\nEarth's nearness to Venus is a matter of perspective. The planet is nearly as big around as Earth. Its diameter at its equator is about 7,521 miles (12,104 kilometers), versus 7,926 miles (12,756 kilometers) for Earth. From Earth, Venus is the brightest object in the night sky after our own Moon");
        venus.addDetailSection("Structure & Surface","planet has an iron core enveloped by a hot-rock mantle; the thinnest of skins forms a rocky, exterior crust." +
                "\n" +
                "\nVenus is the hottest planet in our solar system, with surface temperatures about 872 degrees Fahrenheit (467 Celsius). And atmospheric pressure at the surface squeezes with the same force as being more than 3,000 feet underwater on Earth (930 meters)" +
                "\nSource: NASA Science");

        planets.add(venus);


        Planet earth=new Planet(
                "Earth", "The Blue Marble",
                "The only known planet with life, covered mostly in water.",
                100.0, 1, "⊕", "#3B82C4","#2E8B57"
        );
        earth.addDetailSection("Potential for Life","Earth has a very hospitable temperature and mix of chemicals that have made life abundant here. Most notably, Earth is unique in that most of our planet is covered in liquid water, since the temperature allows liquid water to exist for extended periods of time." +
                "\nSource: NASA Science");
        earth.addDetailSection("Atmosphere","Near the surface, Earth has an atmosphere that consists of 78% nitrogen, 21% oxygen, and 1% other gases such as argon, carbon dioxide, and neon. The atmosphere affects Earth's long-term climate and short-term local weather and shields us from much of the harmful radiation coming from the Sun" +
                "\nSource: NASA Science");
        earth.addDetailSection("Size and Distance","With an equatorial diameter of 7,926 miles (12,756 kilometers), Earth is the biggest of the terrestrial planets and the fifth largest planet in our solar system." +
                "\n" +
                "\nFrom an average distance of 93 million miles (150 million kilometers), Earth is exactly one astronomical unit away from the Sun because one astronomical unit (abbreviated as AU), is the distance from the Sun to Earth. This unit provides an easy way to quickly compare planets' distances from the Sun.");
        earth.addDetailSection("Structure & Surface","Earth is composed of four main layers, starting with an inner core at the planet's center, enveloped by the outer core, mantle, and crust.\n" +
                "\n" +
                "The inner core is a solid sphere made of iron and nickel metals about 759 miles (1,221 kilometers) in radius. There the temperature is as high as 9,800 degrees Fahrenheit (5,400 degrees Celsius). Surrounding the inner core is the outer core. This layer is about 1,400 miles (2,300 kilometers) thick, made of iron and nickel fluids." +
                "\n" +
                "In between the outer core and crust is the mantle, the thickest layer. This hot, viscous mixture of molten rock is about 1,800 miles (2,900 kilometers) thick and has the consistency of caramel. The outermost layer, Earth's crust, goes about 19 miles (30 kilometers) deep on average on land." +
                "\n" +
                "\nLike Mars and Venus, Earth has volcanoes, mountains, and valleys. Earth's lithosphere, which includes the crust (both continental and oceanic) and the upper mantle, is divided into huge plates that are constantly moving. For example, the North American plate moves west over the Pacific Ocean basin, roughly at a rate equal to the growth of our fingernails. Earthquakes result when plates grind past one another, ride up over one another, collide to make mountains, or split and separate.\n" +
                "\n" +
                "Earth's global ocean, which covers about 71% of the planet's surface, has an average depth of about 2.3 miles (3.6 kilometers) and contains 97% of Earth's water" +
                "\n" +
                "Source: NASA Science");
        planets.add(earth);


        Planet mars = new Planet(
                "Mars", "The Red Planet",
                "A cold desert world, once home to flowing water.",
                38.0, 2, "♂", "#C1440E", "#7A2E0E"
        );
        mars.addDetailSection("Atmosphere", "Mars has a thin atmosphere made up mostly of carbon dioxide, nitrogen, and argon gases. To our eyes, the sky would be hazy and red because of suspended dust instead of the familiar blue tint we see on Earth." +
                "\nThe temperature on Mars can be as high as 70 degrees Fahrenheit (20 degrees Celsius) or as low as about -225 degrees Fahrenheit (-153 degrees Celsius). And because the atmosphere is so thin, heat from the Sun easily escapes this planet.");
        mars.addDetailSection("Size and Distance", "With a radius of 2,106 miles (3,390 kilometers), Mars is about half the size of Earth. If Earth were the size of a nickel, Mars would be about as big as a raspberry.From an average distance of 142 million miles (228 million kilometers), Mars is 1.5 astronomical units away from the Sun. One astronomical unit (abbreviated as AU), is the distance from the Sun to Earth. From this distance, it takes sunlight 13 minutes to travel from the Sun to Mars.");
        mars.addDetailSection("Structure & Surface", "Mars has a dense core at its center between 930 and 1,300 miles (1,500 to 2,100 kilometers) in radius. It's made of iron, nickel, and sulfur. Surrounding the core is a rocky mantle between 770 and 1,170 miles (1,240 to 1,880 kilometers) thick, and above that, a crust made of iron, magnesium, aluminum, calcium, and potassium. This crust is between 6 and 30 miles (10 to 50 kilometers) deep." +
                "\nAt the surface, we see colors such as brown, gold, and tan. The reason Mars looks reddish is due to oxidization — or rusting — of iron in the rocks, regolith (Martian “soil”), and dust of Mars." +
                "\n" +
                "\nSource: NASA Science");
        planets.add(mars);

        Planet jupiter =new Planet(
                "Jupiter", "King of the Planets",
                "The largest planet, a gas giant with a Great Red Spot storm.",
                252.8, 115, "♃", "#D9A066","#B5651D"
        );
        jupiter.addDetailSection("Atmosphere","Jupiter's appearance is a tapestry of colorful stripes and spots – the cloud bands that encircle the planet, and the cyclonic storms dotting it from pole to pole. The gas planet likely has three distinct cloud layers in its \"skies\" that, taken together, span about 44 miles (71 kilometers). The top cloud is probably made of ammonia ice, while the middle layer is likely made of ammonium hydrosulfide crystals. The innermost layer may be made of water ice and vapor." +
                "\n" +
                "Stormy Jupiter is swept by over a dozen prevailing winds, some reaching up to 335 miles per hour (539 kilometers per hour) at the equator. The Great Red Spot, a swirling oval of clouds twice as wide as Earth, has been observed on the giant planet for more than 300 years. More recently, three smaller ovals merged to form the Little Red Spot, about half the size of its larger cousin." +
                "\n" +
                "Source: NASA Science");
        jupiter.addDetailSection("Size and Distance","With a radius of 43,440.7 miles (69,911 kilometers), Jupiter is 11 times wider than Earth. If Earth were the size of a grape, Jupiter would be about as big as a basketball.\n" +
                "\n" +
                "From an average distance of 484 million miles (778 million kilometers), Jupiter is 5.2 astronomical units away from the Sun." +
                "\nSource: NASA Science");
        jupiter.addDetailSection("Structure & Surface","The composition of Jupiter is similar to that of the Sun – mostly hydrogen and helium. Deep in the atmosphere, pressure and temperature increase, compressing the hydrogen gas into a liquid. This gives Jupiter the largest ocean in the solar system – an ocean made of hydrogen instead of water. Scientists think that, at depths perhaps halfway to the planet's center, the pressure becomes so great that electrons are squeezed off the hydrogen atoms, making the liquid electrically conducting like metal. Jupiter's fast rotation is thought to drive electrical currents in this region, with the spinning of the liquid metallic hydrogen acting like a dynamo, generating the planet's powerful magnetic field." +
                "\n" +
                "\nAs a gas giant, Jupiter doesn’t have a true surface. The planet is mostly swirling gases and liquids. While a spacecraft would have nowhere to land on Jupiter, it wouldn’t be able to fly through unscathed either" +
                "\nSource: NASA Science");
        planets.add(jupiter);



        Planet saturn=new Planet(
                "Saturn", "The Ringed Jewel",
                "Famous for its dazzling ring system made of ice and rock.",
                108.0, 292, "♄", "#E3C088","#B8935F"
        );
        saturn.addDetailSection("Atmosphere","Saturn is blanketed with clouds that appear as faint stripes, jet streams, and storms. The planet is many different shades of yellow, brown, and gray.\n" +
                "\n" +
                "Winds in the upper atmosphere reach 1,600 feet per second (500 meters per second) in the equatorial region. In contrast, the strongest hurricane-force winds on Earth top out at about 360 feet per second (110 meters per second)." +
                "\n" +
                "And the pressure – the same kind you feel when you dive deep underwater – is so powerful it squeezes gas into a liquid." +
                "\nSource: NASA Science");
        saturn.addDetailSection("Size and Distance","With an equatorial diameter of about 74,897 miles (120,500 kilometers), Saturn is 9 times wider than Earth. If Earth were the size of a nickel, Saturn would be about as big as a volleyball.\n" +
                "\n" +
                "From an average distance of 886 million miles (1.4 billion kilometers), Saturn is 9.5 astronomical units away from the Sun.");
        saturn.addDetailSection("Structure & Surface","Like Jupiter, Saturn is made mostly of hydrogen and helium. At Saturn's center is a dense core of metals like iron and nickel surrounded by rocky material and other compounds solidified by intense pressure and heat. It is enveloped by liquid metallic hydrogen inside a layer of liquid hydrogen –similar to Jupiter's core but considerably smaller." +
                "\n" +
                "\nAs a gas giant, Saturn doesn’t have a true surface. The planet is mostly swirling gases and liquids deeper down." +
                "\nThe extreme pressures and temperatures deep inside the planet would crush, melt, and vaporize any spacecraft trying to fly into the planet." +
                "\nSource: NASA Science");
        planets.add(saturn);

        Planet Uranus =new Planet(
                "Uranus", "The Sideways Planet",
                "An ice giant that rotates on its side, tilted almost 98 degrees.",
                89.0, 29, "⛢", "#7FDBD4","#4A9B94"
        );
        Uranus.addDetailSection("Atmosphere","Uranus' atmosphere is mostly hydrogen and helium, with a small amount of methane and traces of water and ammonia. The methane gives Uranus its signature blue color." +
                "\nSource: NASA Science");
        Uranus.addDetailSection("Size and Distance","With an equatorial diameter of 31,763 miles (51,118 kilometers), Uranus is four times wider than Earth. If Earth was the size of a nickel, Uranus would be about as big as a softball.\n" +
                "\n" +
                "From an average distance of 1.8 billion miles (2.9 billion kilometers), Uranus is about 19 astronomical units away from the Sun");
        Uranus.addDetailSection("Structure & Surface","Uranus is one of two ice giants in the outer solar system (the other is Neptune). Most (80% or more) of the planet's mass is made up of a hot dense fluid of \"icy\" materials – water, methane, and ammonia – above a small rocky core. Near the core, it heats up to 9,000 degrees Fahrenheit (4,982 degrees Celsius)." +
                "\n" +
                "Uranus is slightly larger in diameter than its neighbor Neptune, yet smaller in mass. It is the second least dense planet; Saturn is the least dense of all." +
                "\n" +
                "\nAs an ice giant, Uranus doesn’t have a true surface. The planet is mostly swirling fluids. While a spacecraft would have nowhere to land on Uranus, it wouldn’t be able to fly through its atmosphere unscathed either. The extreme pressures and temperatures would destroy a metal spacecraft." +
                "\nSource: NASA Science");
        planets.add(Uranus);


        Planet Neptune =new Planet(
                "Neptune", "The Windy Giant",
                "The most distant planet, with the fastest winds in the solar system.",
                114.0, 16, "♆", "#4A6FE0","#2541A8"
        );
        Neptune.addDetailSection("Atmosphere","Neptune's atmosphere is made up mostly of hydrogen and helium with just a little bit of methane. Neptune's neighbor Uranus has a similar makeup; the methane absorbs other colors but reflects blue, giving these ice giants their similar hue" +
                "Neptune is our solar system's windiest world. Despite its great distance and low energy input from the Sun, Neptune's winds can be three times stronger than Jupiter's and nine times stronger than Earth's."
                );
        Neptune.addDetailSection("Size and Distance","With an equatorial diameter of 30,775 miles (49,528 kilometers), Neptune is about four times wider than Earth. If Earth were the size of a nickel, Neptune would be about as big as a baseball.\n" +
                "\n" +
                "From an average distance of 2.8 billion miles (4.5 billion kilometers), Neptune is 30 astronomical units away from the Sun");
        Neptune.addDetailSection("Structure & Surface","Neptune is one of two ice giants in the outer solar system.Most (80% or more) of the planet's mass is made up of a hot dense fluid of \"icy\" materials – water, methane, and ammonia – above a small, rocky core. Of the giant planets, Neptune is the densest." +
                "\n" +
                "Neptune does not have a solid surface. Its atmosphere (made up mostly of hydrogen, helium, and methane) extends to great depths" +
                "\nSource: NASA Science");
        planets.add(Neptune);

    }

    /** Returns every planet — used by the /planets list page. */
    public List<Planet> getAllPlanets() {
        return planets;
    }

    /**
     * Finds one planet by name, ignoring case, so "mars", "Mars",
     * and "MARS" in a URL all match the same planet.
     * Returns null if nothing matches — the controller decides what
     * to do about that (we'll handle it properly in a moment).
     */
    public Planet getPlanetByName(String name) {
        for (Planet planet : planets) {
            if (planet.getName().equalsIgnoreCase(name)) {
                return planet;
            }
        }
        return null;
    }
}

