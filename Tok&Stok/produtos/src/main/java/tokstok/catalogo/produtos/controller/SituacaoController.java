package tokstok.catalogo.produtos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tokstok.catalogo.produtos.model.Situacao;
import tokstok.catalogo.produtos.service.SituacaoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/situacoes")
public class SituacaoController {

    @Autowired
    private SituacaoService situacaoService;

    @GetMapping("/listar")
    public ResponseEntity<List<Situacao>> listar(){
        return ResponseEntity.ok().body(situacaoService.listar());
    }

    @PostMapping("/salvar")
    public ResponseEntity<Object> inserir(@RequestBody Situacao situacao){
        return ResponseEntity.status(HttpStatus.CREATED).body(situacaoService.salvarSituacao(situacao));
    }


    
}
