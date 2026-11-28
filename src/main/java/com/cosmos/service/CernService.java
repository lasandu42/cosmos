package com.cosmos.service;

import com.cosmos.model.CernDataset;
import com.cosmos.model.CernSearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.List;
import java.util.Objects;

@Service
public class CernService {

    private final RestClient restClient;

    public CernService(RestClient.Builder builder,
                       @Value("${cern.opendata.url}") String baseUrl) {
        this.restClient = builder.baseUrl(baseUrl).build();
    }

    /** A few small "derived" (learning-level) datasets for one experiment. */
    public List<CernDataset> findDerivedDatasets(String experiment, int size) {
        try {
            CernSearchResponse response = restClient.get()
                    .uri(uri -> uri
                            .queryParam("type", "Dataset")
                            .queryParam("subtype", "Derived")
                            .queryParam("experiment", experiment)
                            .queryParam("size", size)
                            .build())
                    .retrieve()
                    .body(CernSearchResponse.class);

            if (response == null || response.hits() == null || response.hits().hits() == null) {
                return List.of();
            }
            return response.hits().hits().stream()
                    .map(CernSearchResponse.Hit::metadata)
                    .filter(Objects::nonNull)
                    .toList();
        } catch (RestClientException e) {
            return List.of();   // CERN unreachable: the page shows a friendly message
        }
    }
}