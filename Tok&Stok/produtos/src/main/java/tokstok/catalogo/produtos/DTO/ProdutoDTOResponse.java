package tokstok.catalogo.produtos.DTO;

import java.util.List;
import java.util.stream.Collectors;

import tokstok.catalogo.produtos.model.Produto;
import tokstok.catalogo.produtos.model.Situacao;
import tokstok.catalogo.produtos.model.Tendencia;
import tokstok.catalogo.produtos.model.Video;

public class ProdutoDTOResponse {

	private Long id;
	private String nome;
	private Situacao situacao;
	private Tendencia tendencia;
	private Long quantidadeVideo;
	private List<Video> videos;

	public ProdutoDTOResponse() {

	}

	public ProdutoDTOResponse(Produto produto) {
		this.id = produto.getId();
		this.nome = produto.getNome();
		this.situacao = produto.getSituacao();
		this.tendencia = produto.getTendencia();
		this.videos = produto.getVideos();
	}

	public ProdutoDTOResponse(Produto produto, Long qtdVideo) {
		this.id = produto.getId();
		this.nome = produto.getNome();
		this.situacao = produto.getSituacao();
		this.tendencia = produto.getTendencia();
		this.videos = produto.getVideos();
		this.quantidadeVideo = qtdVideo;

	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Situacao getSituacao() {
		return situacao;
	}

	public void setSituacaoProduto(Situacao situacao) {
		this.situacao = situacao;
	}

	public Tendencia getTendencia() {
		return tendencia;
	}

	public void setTendencia(Tendencia tedencia) {
		this.tendencia = tedencia;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Video> getVideos() {
		return videos;
	}

	public void setVideos(List<Video> videos) {
		this.videos = videos;
	}

	public List<ProdutoDTOResponse> listaResponse(List<Produto> produtos) {
		return produtos.stream().map(ProdutoDTOResponse::new).collect(Collectors.toList());
	}

	public Long getQuantidadeVideo() {
		return quantidadeVideo;
	}

	public void setQuantidadeVideo(Long quantidadeVideo) {
		this.quantidadeVideo = quantidadeVideo;
	}

}
