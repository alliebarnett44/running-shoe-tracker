terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.25.0"
    }
  }

  cloud {
    organization = "alliebarnett44"

    workspaces {
      name = "running-shoe-tracker"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

