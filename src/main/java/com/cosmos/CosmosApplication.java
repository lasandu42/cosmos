package com.cosmos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point. Running this main() method starts an embedded web server
 * (Tomcat, by default) on port 8080 and wires up everything annotated
 * with @Controller, @Service, etc. in this package and sub-packages.
 */
@SpringBootApplication
public class CosmosApplication {

    public static void main(String[] args) {
        SpringApplication.run(CosmosApplication.class, args);
    }
}
