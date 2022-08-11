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
import tokstok.catalogo.produtos.model.Tendencia;
import tokstok.catalogo.produtos.service.TendenciaService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/tendencias")
public class TendenciaController {
	
	@Autowired
	TendenciaService tendenciaService;
	
	@PostMapping("/salvar")
	public ResponseEntity<Object> salvar(@RequestBody Tendencia tendencia) {
		return ResponseEntity.status(HttpStatus.CREATED).body(tendenciaService.salvarTendencia(tendencia));
	
	}

	@GetMapping("/listar")
    public ResponseEntity<List<Tendencia>> listar(){
        return ResponseEntity.ok().body(tendenciaService.listar());
    }
}
