package tokstok.catalogo.produtos.exception;

public class SituacaoException extends Exception {
	
private static final long serialVersionUID = 1L;
	
	public SituacaoException() {
		super();
	}
	
	public SituacaoException(String message) {
		super(message);
	}
	

	public SituacaoException(String message, Exception cause) {
		super(message, cause);
	}
	
	public SituacaoException(Exception e) {
		super(e);
	}

}
