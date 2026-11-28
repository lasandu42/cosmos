package com.cosmos.controller;

import com.cosmos.model.CernExperiment;
import com.cosmos.service.CernService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class CernController {

    private static final List<CernExperiment> EXPERIMENTS = List.of(
            new CernExperiment("CMS", "Compact Muon Solenoid",
                    "One of the two general-purpose detectors at the LHC, built around a huge superconducting magnet. It searches for the Higgs boson, extra dimensions and particles that could make up dark matter."),
            new CernExperiment("ATLAS", "ATLAS",
                    "The LHC's other general-purpose detector. Together with CMS it announced the discovery of the Higgs boson in 2012."),
            new CernExperiment("ALICE", "A Large Ion Collider Experiment",
                    "Studies collisions of heavy lead ions, recreating the extremely hot, dense quark-gluon plasma that filled the early universe."),
            new CernExperiment("LHCb", "LHCb",
                    "Studies particles containing the beauty quark to understand why the universe is made of matter and not antimatter.")
    );

    private final CernService cernService;

    public CernController(CernService cernService) {
        this.cernService = cernService;
    }

    @GetMapping("/cern")
    public String cern(@RequestParam(defaultValue = "CMS") String experiment, Model model) {
        // Pick from OUR list. The visitor's text never goes to CERN, so nobody can inject odd queries.
        CernExperiment selected = EXPERIMENTS.stream()
                .filter(e -> e.code().equalsIgnoreCase(experiment))
                .findFirst()
                .orElse(EXPERIMENTS.get(0));

        model.addAttribute("experiments", EXPERIMENTS);
        model.addAttribute("selected", selected);
        model.addAttribute("datasets", cernService.findDerivedDatasets(selected.code(), 6));
        return "cern";
    }
}