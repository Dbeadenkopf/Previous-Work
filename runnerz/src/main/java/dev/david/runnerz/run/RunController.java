// our controller to control flow of endpoints
package dev.david.runnerz.run;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.boot.autoconfigure.security.ConditionalOnDefaultWebSecurity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/runs")
public class RunController {
    
    private final RunRepository runRepository;

    // utilizing dependency injection so we dont have to utilize new 
    // run the repository that gets passed in as an argument
    public RunController(RunRepository runRepository){
        this.runRepository = runRepository;
    }

    @GetMapping("")
    List<Run> findAll(){
        return runRepository.findAll();
    }

    // lets do a getMapping for IDS
    @GetMapping("/{id}")
    Run findById(@PathVariable Integer id){
        Optional<Run> run = runRepository.findById(id);
        if(run.isEmpty()){
            //throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Run not Found");
            throw new RunNotFoundException();
        }else{
            return run.get();
        }
    }

    // post(add to)
    // this PostMapping allows for us to use Postman feature to view Post
    // ReponseStatus Helps with creating a 201 reponce status which
    // shows that something is created, we no longer have to look
    // at the actual data
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    void create(@Valid @RequestBody Run run){
        runRepository.create(run);
    }

    // put(update)
    // response stuatus no content to send back
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    void update(@Valid @RequestBody Run run, @PathVariable Integer id){
        runRepository.update(run,id);
    }
    // delete(delete one)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    void delete(@PathVariable Integer id){
        runRepository.delete(id);
    }

   



}
