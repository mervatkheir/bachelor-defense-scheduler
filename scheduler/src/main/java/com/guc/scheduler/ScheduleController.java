package com.guc.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/schedule")
public class ScheduleController {

    @Autowired
    private SchedulingService schedulingService;

//    @GetMapping
//    public List<SchedulingService.PentaTuple> getSchedule() {
//        List<SchedulingService.PentaTuple> schedule = schedulingService.schedule("src/49- Input.csv");
//        schedule.forEach( pentaTuple -> System.out.println(pentaTuple.studentNo + " " + pentaTuple.external + " " + pentaTuple.internal + " " + pentaTuple.date + " " + pentaTuple.time + " " + pentaTuple.room));
//        return schedule;
//    }

    @PostMapping("/upload")
    public List<SchedulingService.ScheduleEntry> uploadAndSchedule(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        try {
            List<SchedulingService.ScheduleEntry> schedule = schedulingService.schedule(file);
            return schedule;
        } catch (Exception e) {
            throw new RuntimeException("Failed to process file", e);
        }
    }
}
