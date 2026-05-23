export interface BaseRepository<T> {
  save(entity: T): Promise<void>;

  findById(id: string): Promise<T | null>;
}