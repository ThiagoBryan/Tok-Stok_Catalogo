package tokstok.catalogo.produtos.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class Produto implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_produto")
	private Long id;

	@Column(name = "nome_produto")
	private String nome;

	@ManyToOne
	@JoinColumn(name = "id_situacao")
	private Situacao situacao;

	@ManyToOne
	@JoinColumn(name = "id_tendencia")
	private Tendencia tendencia;

	@Transient
	private Long quantidadeVideo;

	@JsonManagedReference
	@OneToMany(mappedBy = "produto", fetch = FetchType.EAGER)
	@OrderBy(value = "posicao asc")
	private List<Video> videos;

	public Produto() {
		super();
	}

	public Produto(Long id, String nome, Situacao situacao, Tendencia tendencia, Long quantidadeVideo,
			List<Video> videos) {
		this.id = id;
		this.nome = nome;
		this.situacao = situacao;
		this.tendencia = tendencia;
		this.quantidadeVideo = quantidadeVideo;
		this.videos = videos;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public void setSituacao(Situacao situacao) {
		this.situacao = situacao;
	}

	public Tendencia getTendencia() {
		return tendencia;
	}

	public void setTendencia(Tendencia tendencia) {
		this.tendencia = tendencia;
	}

	public Long getQuantidadeVideo() {
		return quantidadeVideo;
	}

	public void setQuantidadeVideo(Long quantidadeVideo) {
		this.quantidadeVideo = quantidadeVideo;
	}

	public List<Video> getVideos() {
		return videos;
	}

	public void setVideos(List<Video> videos) {
		this.videos = videos;
	}

	

}
