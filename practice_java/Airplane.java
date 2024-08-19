import java.time.LocalTime;

public class Airplane {
    private String number;
    private String destination;
    private LocalTime scheduledDeparture;
    private int delayTime;
    
    public Airplane(String N, String D, LocalTime sD){
        this.number = N;
        this.destination = D;
        this.scheduledDeparture = sD;
        this.delayTime = 0;
    }

    public String getNum(){
        return number;
    }

    public String getDest(){
        return destination;
    }
    public LocalTime getLocalTime(){
        return scheduledDeparture;
    }
    public int getDelayTime(){
        return delayTime;
    }   

    public void setNum(String N){
        this.number = N;
    }
    public void setDest(String D){
        this.destination = D;
    }
    public void setSchedDep(LocalTime sD){
        this.scheduledDeparture = sD;
    }
    public void setDelayTime(int D){
        this.delayTime = D;
    }

    // method to set our delay
    public void delay(int minutes){
        this.delayTime = minutes;
        this.scheduledDeparture = this.scheduledDeparture.plusMinutes(minutes);
    }

    public void flightStatus(){
        if(this.delayTime == 0){
            System.out.println("Flight " + number + " to " + destination + " is on time.");
        }else{
            System.out.println("Flight " + number + " to " + destination + " is delayed by " + delayTime);
        }
    }

}
