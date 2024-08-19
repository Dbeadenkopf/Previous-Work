

public class Book {
    private String title;
    private String author;
    
    public Book(String T, String A){
        this.title = T;
        this.author = A;
    }

    public String getTitle(){
        return title;
    }

    public String getAuthor(){
        return author;
    }

    public void setTitle(String T){
        this.title = T;
    }

    public void setAuthor(String A){
        this.author = A;
    }
    
}
