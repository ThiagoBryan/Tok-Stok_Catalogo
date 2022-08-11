package tokstok.catalogo.produtos.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tokstok.catalogo.produtos.exception.VideoException;
import tokstok.catalogo.produtos.model.Video;
import tokstok.catalogo.produtos.service.VideoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/videos")
public class VideoController {

	@Autowired
	VideoService videoService;

	@PostMapping("/salvar")
	public ResponseEntity<Long> salvar(@RequestParam MultipartFile file, @RequestParam Long idProduto) throws IOException {
		if(file == null){
			throw new IOException("Erro ao salvar o arquivo");
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(videoService.salvar(file, idProduto));
	}

	@GetMapping("/buscar/{id}")
	public ResponseEntity<byte[]> buscarPorId(@PathVariable Long id) throws VideoException {
		
		Video video = videoService.buscarPorId(id);
		HttpHeaders headers = new HttpHeaders();
		headers.add("content-type", video.getTipo());
		headers.add("content-lenght", String.valueOf(video.getDados().length));
		return new ResponseEntity<>(video.getDados(), headers, HttpStatus.OK);
	}

	@PutMapping("/atualizar/{id}")
	public ResponseEntity<Object> atualizarNome(@PathVariable Long id, @RequestParam String nome) throws VideoException{
		videoService.atualizarNome(id, nome);
		return ResponseEntity.status(HttpStatus.CREATED).body(nome);
	}
	
	@PutMapping("/atualizar/descricao/{id}")
	public ResponseEntity<Object> atualizarDescricao(@PathVariable Long id, @RequestParam String descricao) throws VideoException{
		videoService.atualizarDescricao(id, descricao);
		return ResponseEntity.status(HttpStatus.CREATED).body(descricao);
	}

	@PutMapping("/atualizar/posicao/{id}")
	public ResponseEntity<Object> atualizarPosicao(@PathVariable Long id, @RequestParam Integer posicao) throws VideoException{
		videoService.atualizarPosicao(id, posicao);
		return ResponseEntity.status(HttpStatus.CREATED).body(posicao);
	}

	@DeleteMapping("/deletar/{id}")
	public ResponseEntity<Object> deletarPorId(@PathVariable Long id) throws VideoException{
		videoService.deletar(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
