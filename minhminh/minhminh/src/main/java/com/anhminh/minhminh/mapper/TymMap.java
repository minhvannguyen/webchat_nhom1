package com.anhminh.minhminh.mapper;

import com.anhminh.minhminh.dto.TymDto;
import com.anhminh.minhminh.module.Tyms;
import org.springframework.stereotype.Component;

@Component
public class TymMap {
    public Tyms toEntity(TymDto tymDto) {
        Tyms tyms = new Tyms();

        tyms.setIdTym(tymDto.getIdTym());
        tyms.setIdUser(tymDto.getIdUser());
        tyms.setIdPost(tymDto.getIdPost());

        return  tyms;
    }

    public TymDto toDto(Tyms tyms) {
        TymDto tymDto = new TymDto();

        tymDto.setIdTym(tyms.getIdTym());
        tymDto.setIdUser(tyms.getIdUser());
        tymDto.setIdPost(tyms.getIdPost());

        return  tymDto;
    }
}
