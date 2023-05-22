package com.builder.pc;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.builder.pc.entities.PcPart;
import com.builder.pc.repositories.PcPartRepository;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class PartsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PcPartRepository pcPartRepository;

    @Test
    public void testGetPcPart() throws Exception {
        // given
        PcPart part1 = new PcPart();
        part1.setId(1L);
        part1.setName("Asus");
        part1.setDescription("Asus motherboard");
        part1.setImage("image_url");
        part1.setPrice(100.0f);
        part1.setType("Motherboard");

        PcPart part2 = new PcPart();
        part2.setId(2L);
        part2.setName("Gigabyte");
        part2.setDescription("Gigabyte motherboard");
        part2.setImage("image_url");
        part2.setPrice(120.0f);
        part2.setType("Motherboard");

        List<PcPart> allParts = Arrays.asList(part1, part2);

        when(pcPartRepository.findAll()).thenReturn(allParts);

        // when + then
        mockMvc.perform(get("/pc/parts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value(part1.getName()))
                .andExpect(jsonPath("$[1].name").value(part2.getName()));
    }
}
