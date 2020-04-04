using college.@interface;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace college.entity
{
    public class GenericEntity<T> : IGeneric<T> where T : class
    {
        private readonly TaskDBContext _dbContext;

        public GenericEntity()
        {
            _dbContext = new TaskDBContext();
          //  _dbContext.Database.Migrate();
         
        }

        public virtual T GetById(int id)
        {
            return _dbContext.Set<T>().Find(id);
        }

        public virtual IQueryable<T> List()
        {
            return _dbContext.Set<T>().AsQueryable();
        }

        public virtual IEnumerable<T> List(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {
            return _dbContext.Set<T>()
                   .Where(predicate)
                   .AsEnumerable();
        }

        public T Add(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            _dbContext.SaveChanges();
            return entity;
        }

        public void Update(T entity)
        {
            try
            {
                _dbContext.Entry(entity).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }
            
        }

        public void Delete(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Deleted;
            _dbContext.Set<T>().Remove(entity);
            _dbContext.SaveChanges();
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>> predicate)
        {
            return _dbContext.Set<T>()
                   .Where(predicate)
                   .AsEnumerable();
        }

        public List<T> BulkAdd(List<T> entity)
        {
            _dbContext.Set<T>().AddRange(entity);
            _dbContext.SaveChanges();
            return entity;
        }
    }
}
