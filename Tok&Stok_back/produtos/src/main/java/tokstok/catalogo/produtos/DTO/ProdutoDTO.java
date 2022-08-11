package tokstok.catalogo.produtos.DTO;

import javax.validation.constraints.NotBlank;

import tokstok.catalogo.produtos.model.Produto;
import tokstok.catalogo.produtos.model.Situacao;
import tokstok.catalogo.produtos.model.Tendencia;

public class ProdutoDTO {

	private Long id;
	@NotBlank
	private String nome;
	@NotBlank
	private String codigo;
	@NotBlank
	private Situacao situacao;
	@NotBlank
	private Tendencia tendencia;

	public ProdutoDTO() {

	}

	public ProdutoDTO(Produto produto) {
		super();
		this.id = produto.getId();

	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	

	public Situacao getSituacao() {
		return situacao;
	}

	public void setSituacao(Situacao situacaoProduto) {
		this.situacao = situacaoProduto;
	}

	public Tendencia getTendencia() {
		return tendencia;
	}

	public void setTendencia(Tendencia tendencia) {
		this.tendencia = tendencia;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
