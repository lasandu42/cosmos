package com.cosmos.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record CernSearchResponse(Hits hits) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Hits(long total, List<Hit> hits){}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Hit(CernDataset metadata){}
}
