using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace college.@interface
{
    public interface IGeneric<T> where T : class
    {

        T GetById(int id);
        IEnumerable<T> Get(Expression<Func<T, bool>> predicate);
        IQueryable<T> List();
        IEnumerable<T> List(Expression<Func<T, bool>> predicate);
        T Add(T entity);
        List<T> BulkAdd(List<T> entity);
        void Update(T entity);
        void Delete(T entity);

    }
}
