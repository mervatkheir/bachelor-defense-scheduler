package com.guc.scheduler;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class SchedulingService {

    private static LocalDate START_DATE = LocalDate.parse("2024-08-01");
    private static LocalTime START_TIME = LocalTime.of(8, 0); // 8 AM start
    private static int SLOT_DURATION_IN_MINUTES = 30; // Each slot is 30 minutes

    public static List<ScheduleEntry> schedule(MultipartFile file) {
        List<PentaTuple> studentsToBeAssigned = loadStudents(file);
        HashMap<String, int[][]> externalAvailableSlots = new HashMap<>();
        HashMap<String, int[][]> internalAvailableSlots = new HashMap<>();
        loadSlots(externalAvailableSlots, internalAvailableSlots, studentsToBeAssigned);

        ArrayList<Pair> numberOfSlots = new ArrayList<>();
        calculateNumberOfSlots(numberOfSlots, studentsToBeAssigned);

        HashMap<String, String[][]> rooms = initializeRooms();
        List <ScheduleEntry> result = tabulate(studentsToBeAssigned, externalAvailableSlots, internalAvailableSlots, numberOfSlots.toArray(new Pair[0]), rooms);
        return result;
    }


private static List<PentaTuple> loadStudents(MultipartFile file) {
    List<PentaTuple> students = new ArrayList<>();
    try (InputStreamReader isr = new InputStreamReader(file.getInputStream());
         CSVReader csvReader = new CSVReaderBuilder(isr).withSkipLines(1).build()) {
        String[] values;
        while ((values = csvReader.readNext()) != null) {
            if (values.length < 6) {
                System.out.println("Skipping malformed row: " + Arrays.toString(values));
                continue;
            }
            students.add(new PentaTuple(values[0],values[1],values[3], values[5], values[4]));
        }
    } catch (Exception e) {
        throw new RuntimeException("Error processing CSV file", e);
    }
    return students;
}

    private static void loadSlots(HashMap<String, int[][]> externalAvailableSlots, HashMap<String, int[][]> internalAvailableSlots, List<PentaTuple> students) {
        // Assuming each external/internal supervisor has a slot array of 1 day with 30 slots.
        int days = 30; // Number of days
        int slotsPerDay = 8; // Number of slots per day

        for (PentaTuple student : students) {
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


    private static void calculateNumberOfSlots(ArrayList<Pair> numberOfSlots, List<PentaTuple> students) {
        HashMap<String, Integer> count = new HashMap<>();
        for (PentaTuple student : students) {
            count.put(student.external, count.getOrDefault(student.external, 0) + 1);
        }
        count.forEach((key, value) -> numberOfSlots.add(new Pair(key, value)));
    }

    private static HashMap<String, String[][]> initializeRooms() {
        HashMap<String, String[][]> rooms = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            rooms.put("room" + i, new String[30][15]);
        }

        return rooms;
    }

    public static ArrayList<ScheduleEntry> tabulate(List<PentaTuple> studentsToBeAssigned, HashMap<String, int[][]> externalAvailableSlots, HashMap<String, int[][]> internalAvailableSlots, Pair[] numberOfSlots, HashMap<String, String[][]> rooms) {
        ArrayList<ScheduleEntry> scheduled = new ArrayList<>();
        HashSet<String> assignedStudents = new HashSet<>();

        // Iterate over each student
        for (PentaTuple student : studentsToBeAssigned) {
            if (assignedStudents.contains(student.studentNo)) {
                continue; // If already scheduled, skip to the next student
            }
            int[][] externalSlots = externalAvailableSlots.get(student.external);
            int[][] internalSlots = internalAvailableSlots.get(student.internal);

            // Search for a matching slot and room
            outerloop:
            for (int day = 0; day < externalSlots.length; day++) {
                for (int slot = 0; slot < externalSlots[day].length; slot++) {
                    if (externalSlots[day][slot] == 1 && internalSlots[day][slot] == 1) {
                        // Check room availability
                        String assignedRoom = findAvailableRoom(rooms, day, slot);
                        if (assignedRoom != null) {
                            // Schedule the student and mark the slot as occupied
                            externalSlots[day][slot] = 0;
                            internalSlots[day][slot] = 0;

                            String date = calculateDate(day+1);
                            String time = calculateTime(slot+1);

                            ScheduleEntry assignment = new ScheduleEntry(student.studentNo,student.studentName, student.topic, student.external, student.internal, date, time, assignedRoom);
                            scheduled.add(assignment);
                            assignedStudents.add(student.studentNo);
                            break outerloop; // Break out of all loops for this student once scheduled
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

    private static String calculateDate(int day) {
        LocalDate date = START_DATE.plusDays(day - 1); // Subtract 1 because day index starts from 1
        return date.format(DateTimeFormatter.ISO_LOCAL_DATE);
    }

    private static String calculateTime(int slot) {
        LocalTime time = START_TIME.plusMinutes((slot - 1) * SLOT_DURATION_IN_MINUTES); // Subtract 1 for zero-based index
        return time.format(DateTimeFormatter.ofPattern("HH:mm"));
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

    static class PentaTuple {
        String studentNo;
        String studentName;
        String topic;
        String external;
        String internal;

        PentaTuple(String studentNo,String studentName, String topic, String external, String internal) {
            this.studentNo = studentNo;
            this.studentName = studentName;
            this.topic = topic;
            this.external = external;
            this.internal = internal;
        }
    }

    static class ScheduleEntry {
        String studentNo;
        String studentName;
        String topic;
        String external;
        String internal;
        String date;
        String time;
        String room;

        ScheduleEntry(String studentNo,String studentName, String topic, String external, String internal, String date, String time, String room) {
            this.studentNo = studentNo;
            this.studentName = studentName;
            this.topic = topic;
            this.external = external;
            this.internal = internal;
            this.date = date;
            this.time = time;
            this.room = room;
        }
        public String getStudentNo() {
            return studentNo;
        }

        public String getStudentName() {
            return studentName;
        }

        public String getTopic() {
            return topic;
        }

        public String getExternal() {
            return external;
        }

        public String getInternal() {
            return internal;
        }

        public String getDate() {
            return date;
        }

        public String getTime() {
            return time;
        }

        public String getRoom() {
            return room;
        }

        // Setters (if you need to modify values after construction)
        public void setStudentNo(String studentNo) {
            this.studentNo = studentNo;
        }

        public void setStudentName(String studentName) {
            this.studentName = studentName;
        }

        public void setTopic(String topic) {
            this.topic = topic;
        }

        public void setExternal(String external) {
            this.external = external;
        }

        public void setInternal(String internal) {
            this.internal = internal;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public void setRoom(String room) {
            this.room = room;
        }
    }
}

