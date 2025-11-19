package com.erms.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI ermsOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Equipment Rental Management System API")
                        .description("API documentation for ERMS mini project")
                        .version("1.0.0"));
    }
}