import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PartService } from './part.service';
import { Part } from './store';
import { FormsModule } from '@angular/forms';

describe('PartService', () => {
  let service: PartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule ],
      providers: [PartService]
    });

    service = TestBed.inject(PartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getParts should return an Observable<Part[]>', () => {
    const dummyParts: Part[] = [
      { id: 1, name: 'Part 1', description: 'Part 1 description', type: 'type1', image: 'image1', price: 123 },
      { id: 2, name: 'Part 2', description: 'Part 2 description', type: 'type2', image: 'image2', price: 456 },
    ];

    service.getParts().subscribe(parts => {
      expect(parts.length).toBe(2);
      expect(parts).toEqual(dummyParts);
    });

    const req = httpMock.expectOne('http://localhost:8080/pc/parts');
    expect(req.request.method).toBe('GET');
    req.flush(dummyParts);
  });
});
