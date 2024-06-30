package com.guc.scheduler;

import com.opencsv.exceptions.CsvValidationException;
import org.springframework.stereotype.Service;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Service
public class SchedulingService {

    public List<PentaTuple> schedule(String filePath) {
        System.out.println("Scheduling started 2");
        List<Triple> studentsToBeAssigned = loadStudents(filePath);
        System.out.println("Scheduling started 3");
        HashMap<String, int[][]> externalAvailableSlots = new HashMap<>();
        HashMap<String, int[][]> internalAvailableSlots = new HashMap<>();
        loadSlots(externalAvailableSlots, internalAvailableSlots, studentsToBeAssigned);
        System.out.println("Scheduling started 4");

        ArrayList<Pair> numberOfSlots = new ArrayList<>();
        calculateNumberOfSlots(numberOfSlots, studentsToBeAssigned);
        System.out.println("Scheduling started 5");

        HashMap<String, String[][]> rooms = initializeRooms();
        List <PentaTuple> result = tabulate(studentsToBeAssigned, externalAvailableSlots, internalAvailableSlots, numberOfSlots.toArray(new Pair[0]), rooms);
        System.out.println("Scheduling started 6");
        result.forEach(pentaTuple -> System.out.println(pentaTuple.studentNo + " " + pentaTuple.external + " " + pentaTuple.internal + " " + pentaTuple.day + " " + pentaTuple.slot + " " + pentaTuple.room));
        return result;
    }

    private List<Triple> loadStudents(String filePath) {
        List<Triple> students = new ArrayList<>();
        try (CSVReader csvReader = new CSVReaderBuilder(new FileReader(filePath)).withSkipLines(1).build()) {
            String[] values;
            while ((values = csvReader.readNext()) != null) {
                if (values.length < 6) {
                    System.out.println("Skipping malformed row: " + Arrays.toString(values));
                    continue;
                }
                students.add(new Triple(values[0], values[5], values[4]));
            }
        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }
        return students;
    }


    private static void loadSlots(HashMap<String, int[][]> externalAvailableSlots, HashMap<String, int[][]> internalAvailableSlots, List<Triple> students) {
        // Assuming each external/internal supervisor has a slot array of 1 day with 30 slots.
        int days = 30; // Number of days
        int slotsPerDay = 8; // Number of slots per day

        for (Triple student : students) {
            if (!externalAvailableSlots.containsKey(student.external)) {
                int[][] slots = new int[days][slotsPerDay];
                for (int i = 0; i < days; i++) {
                    Arrays.fill(slots[i], 1);  // Set all slots to available
                }
                externalAvailableSlots.put(student.external, slots);
            }
            if (!internalAvailableSlots.containsKey(student.internal)) {
                int[][] slots = new int[days][slotsPerDay];
                for (int i = 0; i < days; i++) {
                    Arrays.fill(slots[i], 1);  // Set all slots to available
                }
                internalAvailableSlots.put(student.internal, slots);
            }
        }
    }

    private static void calculateNumberOfSlots(ArrayList<Pair> numberOfSlots, List<Triple> students) {
        HashMap<String, Integer> count = new HashMap<>();
        for (Triple student : students) {
            count.put(student.external, count.getOrDefault(student.external, 0) + 1);
        }
        count.forEach((key, value) -> numberOfSlots.add(new Pair(key, value)));
    }

    private HashMap<String, String[][]> initializeRooms() {
        HashMap<String, String[][]> rooms = new HashMap<>();
        for (int i = 1; i <= 10; i++) {
            rooms.put("room" + i, new String[30][15]);
        }
        return rooms;
    }

    private List<PentaTuple> tabulate(List<Triple> studentsToBeAssigned, HashMap<String, int[][]> externalAvailableSlots, HashMap<String, int[][]> internalAvailableSlots, Pair[] numberOfSlots, HashMap<String, String[][]> rooms) {
        ArrayList<PentaTuple> scheduled = new ArrayList<>();
        Set<String> assignedStudents = new HashSet<>();

        for (Triple student : studentsToBeAssigned) {
            if (assignedStudents.contains(student.studentNo)) {
                continue;
            }
            int[][] externalSlots = externalAvailableSlots.get(student.external);
            int[][] internalSlots = internalAvailableSlots.get(student.internal);

            outerloop:
            for (int day = 0; day < externalSlots.length; day++) {
                for (int slot = 0; slot < externalSlots[day].length; slot++) {
                    if (externalSlots[day][slot] == 1 && internalSlots[day][slot] == 1) {
                        String assignedRoom = findAvailableRoom(rooms, day, slot);
                        if (assignedRoom != null) {
                            externalSlots[day][slot] = 0;
                            internalSlots[day][slot] = 0;
                            PentaTuple assignment = new PentaTuple(student.studentNo, student.external, student.internal, day + 1, slot + 1, assignedRoom);
                            scheduled.add(assignment);
                            assignedStudents.add(student.studentNo);
                            break outerloop;
                        }
                    }
                }
            }
        }
        return scheduled;
    }

    private static String findAvailableRoom(HashMap<String, String[][]> rooms, int day, int slot) {
        for (Map.Entry<String, String[][]> entry : rooms.entrySet()) {
            if (entry.getValue()[day][slot] == null) { // Check if the room at this slot is free
                entry.getValue()[day][slot] = "Booked"; // Mark as booked
                return entry.getKey();
            }
        }
        return null; // Return null if no rooms are available at that slot
    }
    static class Pair implements Comparable<Pair> {
        String x;
        int y;

        Pair(String x, int y) {
            this.x = x;
            this.y = y;
        }

        @Override
        public int compareTo(Pair o) {
            return o.y - this.y;
        }
    }
}
