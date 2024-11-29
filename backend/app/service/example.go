package service

import (
	"sai-backend/app/repository"
)

type Example struct {
	exampleRepository *repository.Example
}

func CreateExampleService(exampleRepository *repository.Example) *Example {
	es := Example{
		exampleRepository: exampleRepository,
	}

	return &es
}

func (es *Example) Teste() {
	es.exampleRepository.Teste()
}
