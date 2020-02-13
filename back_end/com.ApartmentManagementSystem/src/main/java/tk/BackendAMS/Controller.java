package tk.BackendAMS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class Controller {

    @Autowired
    Respository Respository;



    @GetMapping("/GetAllReceipts")
        public list<Receipts> index() {return Respository.findAll()}





}