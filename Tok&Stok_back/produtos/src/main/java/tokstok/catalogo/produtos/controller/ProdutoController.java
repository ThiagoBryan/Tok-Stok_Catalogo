package tokstok.catalogo.produtos.controller;


import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tokstok.catalogo.produtos.DTO.ProdutoDTO;
import tokstok.catalogo.produtos.DTO.ProdutoDTOResponse;
import tokstok.catalogo.produtos.exception.ProdutoException;
import tokstok.catalogo.produtos.service.ProdutoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {
	
	@Autowired
	ProdutoService produtoService;
	
	@PostMapping("/salvar")
	public ResponseEntity<String> salvar(@RequestBody ProdutoDTO produtoDTO) {
		return ResponseEntity.ok(produtoService.salvar(produtoDTO));
		
	}
	
	@GetMapping("/lista")
	public ResponseEntity<List<ProdutoDTOResponse>> listarTodos(){
		return ResponseEntity.ok(produtoService.buscarTodos());
	}

	@GetMapping("/lista/pagina")
	public ResponseEntity<Page<ProdutoDTOResponse>> listaPagina(@PageableDefault
	(sort = "nome", 
	direction = Sort.Direction.ASC,
	size = 10) Pageable pageable){
		Page<ProdutoDTOResponse> produtos = produtoService.buscarTodosPagina(pageable);
		return ResponseEntity.ok(produtos);
	}

	@GetMapping("/filtrar")
	public ResponseEntity<Page<ProdutoDTOResponse>> pesquisaProdutosPorNome(@PageableDefault
	(sort = "nome", 
	direction = Sort.Direction.ASC,
	size = 10) Pageable pageable, @RequestParam String nome, @RequestParam String situacao, 
	@RequestParam String tendencia){
		Page<ProdutoDTOResponse> produtos = produtoService.pesquisaPorNome(pageable, nome, situacao, tendencia);

		return ResponseEntity.ok(produtos);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProdutoDTOResponse> buscarPorId(@PathVariable Long id) throws ProdutoException{
		ProdutoDTOResponse produtoDto = produtoService.buscarPorId(id);

		return ResponseEntity.ok(produtoDto);
	}
	
	@PutMapping("/atualizar/{idProduto}")
	public ResponseEntity<String> atualizar(@PathVariable Long idProduto, @Valid @RequestBody ProdutoDTO produtoDTO) throws ProdutoException {
		return ResponseEntity.ok(produtoService.atualizar(idProduto, produtoDTO));
	}
	
	@DeleteMapping("/{idProduto}")
	public ResponseEntity<Void> deletar(@PathVariable Long idProduto) throws ProdutoException{
		produtoService.deletar(idProduto);
		return new ResponseEntity<>(HttpStatus.ACCEPTED);
	}

	
	@GetMapping("/filtro/video=null")
	public ResponseEntity<Object> listarProdutosSemVideo(@PageableDefault
	(sort = "nome", 
	direction = Sort.Direction.ASC,
	size = 10) Pageable pageable, @RequestParam String nome, @RequestParam String situacao, @RequestParam String tendencia){
		return ResponseEntity.ok().body(produtoService.listaProdutosSemVideo(pageable, nome, situacao, tendencia));
	}

	@GetMapping("/filtro/video=notnull")
	public ResponseEntity<Object> listarProdutosComVideo(@PageableDefault
	(sort = "nome", 
	direction = Sort.Direction.ASC,
	size = 10) Pageable pageable, @RequestParam String nome, @RequestParam String situacao, @RequestParam String tendencia){
		return ResponseEntity.ok().body(produtoService.listaProdutosComVideo(pageable, nome, situacao, tendencia));
	}

	@GetMapping("/verificar/video")
	public ResponseEntity<Object> verificaVideoEmProdutos(){
		return ResponseEntity.ok().body(produtoService.verificaProdutosSemVideo());
	}

	@GetMapping("/filtrar/situacao")
	public ResponseEntity<Object> filtrarPorSituacao(@PageableDefault
	(sort = "nome", 
	direction = Sort.Direction.ASC,
	size = 10) Pageable pageable,@RequestParam String nome, @RequestParam String situacao){
		return ResponseEntity.ok().body(produtoService.filtrarPorSituacao(pageable, situacao.toUpperCase(), nome.toUpperCase()));

	}

	@GetMapping("/filtrar/tendencia")
	public ResponseEntity<Object> filtrarPorTendencia(@PageableDefault
	(sort = "nome", 
	direction = Sort.Direction.ASC,
	size = 10) Pageable pageable,@RequestParam String nome, @RequestParam String tendencia){
		return ResponseEntity.ok().body(produtoService.filtrarPorTendencia(pageable, tendencia.toUpperCase(), nome.toUpperCase()));

	}

}
