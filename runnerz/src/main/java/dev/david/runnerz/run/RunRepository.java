package dev.david.runnerz.run;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import jakarta.annotation.PostConstruct;

@Repository
public class RunRepository {
    // Array List or List that will hold each run
    private List<Run> runs = new ArrayList<Run>();

    // lets grab all of the runs 
    List<Run> findAll(){
        return runs;
    }

    // we ended the video here at 1:08:29 with 3:30:40 left
    Optional<Run> findById(Integer id){
        return runs.stream()
                .filter(run -> run.id() == id)
                .findFirst();
    }

    // function to create a run 
    // for our post
    void create(Run run){
        runs.add(run);
    }

    // function to update data
    // need for our Put
    void update(Run run, Integer id){
        // Optional<Run> means lets find exisitng run
        Optional<Run> existingRun = findById(id);
        if(existingRun.isPresent()){
            runs.set(runs.indexOf(existingRun.get()), run);
        }
    }

    void delete(Integer id){
       runs.removeIf(run -> run.id().equals(id));
    }

    @PostConstruct
    private void init(){
        runs.add(new Run(1, "Monday Morning Run", LocalDateTime.now(), LocalDateTime.now().plus(30, ChronoUnit.MINUTES), 3, Location.INDOOR));

        runs.add(new Run(2, "Wednesday Morning Run", LocalDateTime.now(), LocalDateTime.now().plus(60, ChronoUnit.MINUTES), 6, Location.INDOOR));

        runs.add(new Run(3, "Saturday Morning Run", LocalDateTime.now(), LocalDateTime.now().plus(30, ChronoUnit.MINUTES), 6, Location.OUTDOOR));
    }

}
