package com.anhminh.minhminh.controller;

import com.anhminh.minhminh.dto.TymDto;
import com.anhminh.minhminh.service.Tymservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tym")
public class TymController {
    private  final Tymservice tymservice;

    @Autowired
    public TymController(Tymservice tymservice) {
        this.tymservice = tymservice;
    }

    @PostMapping("/Tymed")
    public ResponseEntity<String> tymed(@RequestBody TymDto tymDto) {
        tymservice.tymService(tymDto);
        return ResponseEntity.ok("Đã tym!");
    }

    @DeleteMapping("/unTym")
    public ResponseEntity<String> unTym(@RequestBody TymDto tymDto) {
        return tymservice.delTymService(tymDto);
    }

    @GetMapping("/numberTym/{id}")
    public ResponseEntity<Integer> numberTym(@PathVariable Long id) {
        return ResponseEntity.ok(tymservice.numberTyms(id));
    }
    @PostMapping("/isTym")
    public ResponseEntity<Boolean> isTym(@RequestBody TymDto tymDto) {
        return ResponseEntity.ok(tymservice.isTymService(tymDto));
    }
}
