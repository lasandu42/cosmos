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

        planets.add (new Planet(
                "Mercury","The Swift Planet",
                "The smallest and fastest planet, closest to the Sun and completes its orbit in just 88 Earth days.",
                38.0, 0, "☿", "#C9A876","#8B7355"
        ));

        planets.add(new Planet(
                "Venus", "Earth's Twin",
                "Similar in size to Earth, but with a toxic, crushing atmosphere.",
                91.0, 0, "♀", "#E8C15A","#C77B3D"
        ));

        planets.add(new Planet(
                "Earth", "The Blue Marble",
                "The only known planet with life, covered mostly in water.",
                100.0, 1, "⊕", "#3B82C4","#2E8B57"
        ));

        planets.add(new Planet(
                "Mars", "The Red Planet",
                "A cold desert world, once home to flowing water.",
                38.0, 2, "♂", "#C1440E","#7A2E0E"
        ));

        planets.add(new Planet(
                "Jupiter", "King of the Planets",
                "The largest planet, a gas giant with a Great Red Spot storm.",
                252.8, 115, "♃", "#D9A066","#B5651D"
        ));

        planets.add(new Planet(
                "Saturn", "The Ringed Jewel",
                "Famous for its dazzling ring system made of ice and rock.",
                108.0, 292, "♄", "#E3C088","#B8935F"
        ));

        planets.add(new Planet(
                "Uranus", "The Sideways Planet",
                "An ice giant that rotates on its side, tilted almost 98 degrees.",
                89.0, 29, "⛢", "#7FDBD4","#4A9B94"
        ));

        planets.add(new Planet(
                "Neptune", "The Windy Giant",
                "The most distant planet, with the fastest winds in the solar system.",
                114.0, 16, "♆", "#4A6FE0","#2541A8"
        ));
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

