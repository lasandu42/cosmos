package com.cosmos.controller;

import com.cosmos.model.Planet;
import com.cosmos.service.PlanetService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class PlanetController{

    //Attribute
    private final PlanetService planetService;

    // Constructor injection: Spring sees this constructor needs a
    // PlanetService, finds the one it already created (because of
    // @Service), and passes it in automatically.

    public PlanetController(PlanetService planetService){
        this.planetService =planetService;
    }

    @GetMapping("/planets")
    public String planets(Model model){
        model.addAttribute("planets",planetService.getAllPlanets());
        return "planets";
    }


    // {name} in the URL pattern is a path variable — a placeholder
    // segment. @PathVariable captures whatever the visitor typed there
    // (e.g. "mars" from /planets/mars) into the "name" parameter below.

    @GetMapping("/planets/{name}")
    public String planetDetail(@PathVariable String name,Model model){
        Planet planet = planetService.getPlanetByName(name);

        if (planet == null){
            return "redirect:/planets";
        }
        model.addAttribute("planet",planet);
        return "planet-detail";// looks for templates/planet-detail.html
    }
}
