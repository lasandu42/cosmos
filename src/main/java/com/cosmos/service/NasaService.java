package com.cosmos.service;

import com.cosmos.model.ApodResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.Optional;

@Service
public class NasaService {

    // Only these harmless tags survive (links, bold, line breaks...). Scripts etc. are removed.
    private static final Safelist SAFE_HTML = Safelist.basic()
            .addEnforcedAttribute("a", "target", "_blank")
            .addEnforcedAttribute("a", "rel", "noopener noreferrer");

    private final RestClient restClient;

    public NasaService(RestClient.Builder builder,
                       @Value("${nasa.apod.url}") String apodUrl) {
        this.restClient = builder.baseUrl(apodUrl).build();
    }

    public Optional<ApodResponse> getLatestApod() {
        try {
            ApodResponse[] result = restClient.get()
                    .uri(uri -> uri.queryParam("per_page", 1).build())
                    .retrieve()
                    .body(ApodResponse[].class);

            if (result == null || result.length == 0) {
                return Optional.empty();
            }
            return Optional.of(sanitize(result[0]));
        } catch (RestClientException e) {
            return Optional.empty();
        }
    }

    /** Everything from outside is untrusted until cleaned, even when it comes from NASA. */
    private ApodResponse sanitize(ApodResponse a) {
        return new ApodResponse(
                a.date(), a.title(), httpsOnly(a.permalink()), a.mediaType(),
                cleanHtml(a.explanation()), httpsOnly(a.url()), httpsOnly(a.hdurl()),
                cleanHtml(a.credit()), cleanHtml(a.copyright()), a.alt());
    }

    private static String cleanHtml(String html) {
        return html == null ? null : Jsoup.clean(html, SAFE_HTML);
    }

    private static String httpsOnly(String url) {
        return (url != null && url.startsWith("https://")) ? url : null;
    }
}