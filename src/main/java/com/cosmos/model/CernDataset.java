package com.cosmos.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Locale;

@JsonIgnoreProperties(ignoreUnknown = true)   // skips the huge "files" lists etc.
public record CernDataset(
        String recid,
        String title,
        @JsonProperty("title_additional") String titleAdditional,
        @JsonProperty("abstract") AbstractInfo abstractInfo,   // "abstract" is a Java keyword
        List<String> experiment,
        @JsonProperty("date_published") String datePublished,
        Distribution distribution,
        List<Author> authors,
        String doi
) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record AbstractInfo(String description) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Distribution(
            @JsonProperty("number_events") Long numberEvents,
            @JsonProperty("number_files") Integer numberFiles,
            Long size) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Author(String name, String orcid) {}

    // ---- Helpers, so the template stays simple and null-safe ----

    public String description() {
        if (abstractInfo != null && abstractInfo.description() != null) {
            return abstractInfo.description();
        }
        return titleAdditional;
    }

    public Long events() { return distribution == null ? null : distribution.numberEvents(); }

    public Integer files() { return distribution == null ? null : distribution.numberFiles(); }

    /** Bytes to a readable size, e.g. 772862267 -> "737.1 MiB". */
    public String readableSize() {
        if (distribution == null || distribution.size() == null) return null;
        double value = distribution.size();
        String[] units = {"B", "KiB", "MiB", "GiB", "TiB", "PiB"};
        int i = 0;
        while (value >= 1024 && i < units.length - 1) {
            value /= 1024;
            i++;
        }
        return String.format(Locale.ROOT, "%.1f %s", value, units[i]);
    }

    /** "Sander, Christian" or "A; B; C et al." Null when the record lists no authors. */
    public String authorLine() {
        if (authors == null || authors.isEmpty()) return null;
        List<String> names = authors.stream()
                .map(Author::name)
                .filter(n -> n != null && !n.isBlank())
                .limit(3)
                .toList();
        if (names.isEmpty()) return null;
        String line = String.join("; ", names);
        return authors.size() > 3 ? line + " et al." : line;
    }

    public String portalUrl() { return recid == null ? null : "https://opendata.cern.ch/record/" + recid; }

    public String doiUrl() { return doi == null ? null : "https://doi.org/" + doi; }
}