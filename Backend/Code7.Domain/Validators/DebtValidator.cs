using Code7.Domain.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Code7.Domain.Validators
{
    public class DebtValidator : AbstractValidator<Debt>
    {
        public DebtValidator()
        {
            RuleFor(x => x.Amount).NotNull().NotEmpty().GreaterThan(0);
            RuleFor(x => x.DebtDate).NotNull().NotEmpty();
            RuleFor(x => x.Reason).NotNull().NotEmpty();
            RuleFor(x => x.CustomerId).NotNull().NotEmpty();
        }
    }
}
