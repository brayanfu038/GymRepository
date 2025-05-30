package com.gymRagnarok.training.service;

import com.gymRagnarok.person.domain.Customer;
import com.gymRagnarok.person.repository.CustomerRepository;
import com.gymRagnarok.training.domain.Routine;
import com.gymRagnarok.training.domain.TrainingPlan;
import com.gymRagnarok.training.dto.RoutineDTO;
import com.gymRagnarok.training.dto.TrainingPlanDTO;
import com.gymRagnarok.training.repository.RoutineRepository;
import com.gymRagnarok.training.repository.TrainingPlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingPlanServiceImpl implements ITrainingPlanService {

    private final TrainingPlanRepository trainingPlanRepository;
    private final RoutineRepository routineRepository;
    private final CustomerRepository customerRepository;

    public TrainingPlanServiceImpl(TrainingPlanRepository trainingPlanRepository,
                                   RoutineRepository routineRepository,
                                   CustomerRepository customerRepository) {
        this.trainingPlanRepository = trainingPlanRepository;
        this.routineRepository = routineRepository;
        this.customerRepository = customerRepository;
    }

    private TrainingPlan convertToEntity(TrainingPlanDTO.Request dto) {
        TrainingPlan plan = new TrainingPlan();
        plan.setObjective(dto.getObjective());
        plan.setNotes(dto.getNotes());

        // Obtener rutinas
        List<Routine> routines = routineRepository.findAllById(dto.getRoutineIds());
        plan.setRoutines(routines);

        // Obtener cliente
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        plan.setCustomer(customer);

        return plan;
    }

    private TrainingPlanDTO.Response convertToResponseDTO(TrainingPlan plan) {
        TrainingPlanDTO.Response dto = new TrainingPlanDTO.Response();
        dto.setId(plan.getId());
        dto.setObjective(plan.getObjective());
        dto.setNotes(plan.getNotes());
        dto.setCustomerId(plan.getCustomer().getId());

        // Convertir rutinas a DTO
        List<RoutineDTO.Response> routineDTOs = plan.getRoutines().stream()
                .map(routine -> {
                    RoutineDTO.Response routineDTO = new RoutineDTO.Response();
                    routineDTO.setId(routine.getId());
                    routineDTO.setRoutineName(routine.getRoutineName());
                    routineDTO.setFocusArea(routine.getFocusArea());
                    return routineDTO;
                })
                .collect(Collectors.toList());

        dto.setRoutines(routineDTOs);
        return dto;
    }

    @Override
    public TrainingPlanDTO.Response createTrainingPlan(TrainingPlanDTO.Request trainingPlanDTO) {
        TrainingPlan newPlan = convertToEntity(trainingPlanDTO);
        return convertToResponseDTO(trainingPlanRepository.save(newPlan));
    }

    @Override
    public List<TrainingPlanDTO.Response> getAllTrainingPlans() {
        return trainingPlanRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TrainingPlanDTO.Response getTrainingPlanById(int id) {
        return trainingPlanRepository.findById((long) id)
                .map(this::convertToResponseDTO)
                .orElseThrow(() -> new RuntimeException("Plan de entrenamiento no encontrado"));
    }

    @Override
    public void deleteTrainingPlan(int id) {
        trainingPlanRepository.deleteById((long) id);
    }
}