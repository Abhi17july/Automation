package com.builder.pc;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.builder.pc.entities.PcPart;
import com.builder.pc.repositories.PcPartRepository;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/pc")
@AllArgsConstructor
public class PartsController {

    private PcPartRepository pcPartRepository;


    @GetMapping("/parts")
    public List<PcPart> getPcParts() {
        return pcPartRepository.findAll();
    }

}
