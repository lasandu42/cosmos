package com.cosmos.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ApodResponse (
    String date,
    String title,
    String permalink,
    @JsonProperty("media_type") String mediaType,
    String explanation,
    String url,
    String hdurl,
    String credit,
    String copyright,
    String alt)
{     public boolean showsImage() { return "image".equals(mediaType); }

    public boolean showsVideo() { return "video".equals(mediaType); }

    /** For image days the real picture is hdurl; url is only NASA's article page. */
    public String imageSource() {
        return (hdurl != null && !hdurl.isBlank()) ? hdurl : url;}

    public boolean canEmbedVideo() {
        return url != null && (url.contains("youtube.com/embed") || url.contains("player.vimeo.com"));
    }
}
