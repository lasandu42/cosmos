package com.cosmos.model;

public class Planet {

    //Attributes
    private String name;
    private String nickname;
    private String description ;
    private double gravityPercent;// relative to Earth's gravity
    private int moonCount;
    private String symbol;
    private String themeColor;
    private String themeColorSecondary;

    //Constructor
    public Planet(String name, String nickname, String description, double gravityPercent, int moonCount,String symbol,String themeColor,String themeColorSecondary){
        this.name =name;
        this.nickname =nickname;
        this.description =description;
        this.gravityPercent =gravityPercent;
        this.moonCount =moonCount;
        this.symbol=symbol;
        this.themeColor= themeColor;
        this.themeColorSecondary = themeColorSecondary;
    }

   // Getters
    public String getName() {
        return name;
    }

    public String getNickname() {
        return nickname;
    }

    public String getDescription() {
        return description;
    }

    public double getGravityPercent() {
        return gravityPercent;
    }

    public int getMoonCount() {
        return moonCount;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getThemeColor() {
        return themeColor;
    }

    public String getThemeColorSecondary() {
        return themeColorSecondary;
    }
}
