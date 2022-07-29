package tokstok.catalogo.produtos.exception;

public class TendenciaException extends Exception  {
	
private static final long serialVersionUID = 1L;
	
	public TendenciaException() {
		super();
	}
	
	public TendenciaException(String message) {
		super(message);
	}
	

	public TendenciaException(String message, Exception cause) {
		super(message, cause);
	}
	
	public TendenciaException(Exception e) {
		super(e);
	}
	

}
