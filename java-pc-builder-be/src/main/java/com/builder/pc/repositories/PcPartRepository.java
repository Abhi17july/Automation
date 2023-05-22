package com.builder.pc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.builder.pc.entities.PcPart;


public interface PcPartRepository extends JpaRepository<PcPart, Long> {}

