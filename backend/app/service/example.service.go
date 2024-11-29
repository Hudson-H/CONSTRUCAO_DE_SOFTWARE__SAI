package service

import (
	"sai-backend/app/repository"
)

type ExampleService struct {
	exampleRepository *repository.ExampleRepository
}

func CreateExampleService(exampleRepository *repository.ExampleRepository) *ExampleService {
	es := ExampleService{
		exampleRepository: exampleRepository,
	}

	return &es
}

func (es *ExampleService) Teste() {
	es.exampleRepository.Teste()
}
