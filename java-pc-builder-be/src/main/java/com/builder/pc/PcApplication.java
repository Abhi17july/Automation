package com.builder.pc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.builder.pc"})
@EnableJpaRepositories(basePackages = {"com.builder.pc.repositories"})
public class PcApplication {

	public static void main(String[] args) {
		SpringApplication.run(PcApplication.class, args);
	}

}
