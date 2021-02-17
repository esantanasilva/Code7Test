using Code7.Domain.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Code7.Domain.Validators
{
    public class CustomerValidator: AbstractValidator<Customer>
    {
        public CustomerValidator()
        {
            RuleFor(x => x.Name).NotNull().NotEmpty();
            RuleFor(x => x.Username).NotNull().NotEmpty();
            RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress();
        }
    }
}
