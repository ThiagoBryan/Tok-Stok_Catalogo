package tokstok.catalogo.produtos.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tokstok.catalogo.produtos.DTO.ProdutoDTO;
import tokstok.catalogo.produtos.DTO.ProdutoDTOResponse;
import tokstok.catalogo.produtos.exception.ProdutoException;
import tokstok.catalogo.produtos.model.Produto;
import tokstok.catalogo.produtos.repository.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;

	public ProdutoDTO ModelEmDTO(ProdutoDTO produtoDTO, Produto produto) {

		produtoDTO.setId(produto.getId());
		produtoDTO.setNome(produto.getNome().toUpperCase());
		produtoDTO.setSituacao(produto.getSituacao());
		produtoDTO.setTendencia(produto.getTendencia());

		return produtoDTO;
	}

	public Produto DTOEmModel(ProdutoDTO produtoDTO, Produto produto) {

		produto.setNome(produtoDTO.getNome().toUpperCase());
		produto.setSituacao(produtoDTO.getSituacao());
		produto.setTendencia(produtoDTO.getTendencia());

		return produto;
	}

	public String salvar(ProdutoDTO produtoDTO) {

		Produto produtoSalvar = new Produto();
		DTOEmModel(produtoDTO, produtoSalvar);
		produtoRepository.save(produtoSalvar);
		return "Produto criado com o id: " + produtoSalvar.getId();

	}

	public List<ProdutoDTOResponse> buscarTodos() {
		List<Produto> listaProduto = produtoRepository.findAll();
			
		return listaProduto.stream()
		.map(produto -> 
			new ProdutoDTOResponse(produto, produtoRepository.quantidadeDeVideosEmProdutos(produto.getId())))
		.collect(Collectors.toList());
	}

	//PAGINAÇÃO PRODUTOS(TODOS)
	public Page<ProdutoDTOResponse> buscarTodosPagina(Pageable pageable) {
		Page<ProdutoDTOResponse> dtoPage = produtoRepository.findAll(pageable)
		.map(produto -> new ProdutoDTOResponse(produto, produtoRepository.quantidadeDeVideosEmProdutos(produto.getId())));
		return dtoPage;
	}

	//PAGINAÇÃO PESQUISA POR NOME
	public Page<ProdutoDTOResponse> pesquisaPorNome(Pageable pageable, String nome, String situacao, String tendencia ){
		Page<ProdutoDTOResponse> dtoPage = produtoRepository.encontrarPorNome(pageable, nome, situacao, tendencia)
		.map(produto -> new ProdutoDTOResponse(produto, produtoRepository.quantidadeDeVideosEmProdutos(produto.getId())));
		
		return dtoPage;
	}

	public String atualizar(Long idProduto, ProdutoDTO produtoDTO) throws ProdutoException {
		Optional<Produto> produto = produtoRepository.findById(idProduto);
		Produto atualizarProduto = new Produto();
		if (produto.isPresent()) {
			atualizarProduto = produto.get();
			atualizarProduto.setNome(produtoDTO.getNome().toUpperCase());
			atualizarProduto.setSituacao(produtoDTO.getSituacao());
			atualizarProduto.setTendencia(produtoDTO.getTendencia());
			produtoRepository.save(atualizarProduto);
			return "O produto com o id " + atualizarProduto.getId() + " foi atualizado";
		}
		throw new ProdutoException("O serviço nao existe");
	}

	public void deletar(Long idProduto) throws ProdutoException {
		Optional<Produto> produto = produtoRepository.findById(idProduto);
		if (produto.isPresent()) {
			produtoRepository.deleteById(idProduto);
		}
		throw new ProdutoException("Produto com o id informado nao encontrado");
	}

	public ProdutoDTOResponse buscarPorId(Long id) throws ProdutoException{
		Produto produto = produtoRepository.findById(id).get();
		ProdutoDTOResponse produtoDTO = new ProdutoDTOResponse(produto);
		produtoDTO.setQuantidadeVideo(produtoRepository.quantidadeDeVideosEmProdutos(produtoDTO.getId()));
		if(produto != null){
			return produtoDTO;
		}
		throw new ProdutoException("Produto com o id informado nao encontrado");
	}

	public Page<ProdutoDTOResponse> listaProdutosSemVideo(Pageable pageable, String nome, String situacao, String tendencia){
		Page<ProdutoDTOResponse> produtos = produtoRepository
		.listaProdutosSemVideo(pageable, nome, situacao.toUpperCase(), tendencia.toUpperCase())
		.map(prod -> 
		new ProdutoDTOResponse(prod, produtoRepository.quantidadeDeVideosEmProdutos(prod.getId())));
		return produtos;
		
	}

	public Boolean verificaProdutosSemVideo(){
		if(produtoRepository.verficaVideoEmProdutos().size() == 0){
			return false;
		}
		return true;
	}

	public Page<ProdutoDTOResponse> listaProdutosComVideo(Pageable pageable, String nome, String situacao, String tendencia){
		Page<ProdutoDTOResponse> produtos = produtoRepository
		.listaProdutosComVideo(pageable, nome, situacao.toUpperCase(), tendencia.toUpperCase())
		.map(prod -> 
		new ProdutoDTOResponse(prod, produtoRepository.quantidadeDeVideosEmProdutos(prod.getId())));
		
		return produtos;	
	} 

	public Page<ProdutoDTOResponse> filtrarPorSituacao(Pageable pageable, String situacao, String nome){
		Page<ProdutoDTOResponse> produtos = produtoRepository.encontrarPorSituacao(situacao.toUpperCase(), pageable, nome)
		.map(prod -> 
		new ProdutoDTOResponse(prod, produtoRepository.quantidadeDeVideosEmProdutos(prod.getId())));
		return produtos;

	}

	public Page<ProdutoDTOResponse> filtrarPorTendencia(Pageable pageable, String tendencia, String nome){
		Page<ProdutoDTOResponse> produtos = produtoRepository.encontrarPorTendencia(tendencia.toUpperCase(), pageable, nome)
		.map(prod -> 
		new ProdutoDTOResponse(prod, produtoRepository.quantidadeDeVideosEmProdutos(prod.getId())));
		return produtos;

	}
}